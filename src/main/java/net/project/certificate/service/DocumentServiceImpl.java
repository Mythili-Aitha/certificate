package net.project.certificate.service;

import net.project.certificate.dto.DocumentDto;
import net.project.certificate.entity.Certificate;
import net.project.certificate.entity.Document;
import net.project.certificate.exception.CertificateNotFoundException;
import net.project.certificate.exception.DocumentNotFoundException;
import net.project.certificate.mapper.CertificateMapper;
import net.project.certificate.repository.CertificateRepository;
import net.project.certificate.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final CertificateRepository certificateRepository;
    private final CertificateMapper certificateMapper;
    private final String UPLOAD_DIR = "uploads/";

    @Autowired
    public DocumentServiceImpl(DocumentRepository documentRepository, CertificateRepository certificateRepository, CertificateMapper certificateMapper) {
        this.documentRepository = documentRepository;
        this.certificateRepository = certificateRepository;
        this.certificateMapper = certificateMapper;
    }


    @Override
    public DocumentDto uploadDocument(Long certificateId, MultipartFile file) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(()-> new CertificateNotFoundException("Certificate not found with id: " + certificateId));
        String fileName = file.getOriginalFilename();
        String filePath = UPLOAD_DIR + fileName;
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        try {
            Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }

        Document document = new Document();
        document.setCertificate(certificate);
        document.setFileName(fileName);
        document.setFilePath(filePath);
        document.setUploadedAt(java.time.LocalDateTime.now());

        Document savedDocument = documentRepository.save(document);
        return certificateMapper.toDocumentDto(savedDocument);
    }

    @Override
    public List<DocumentDto> getDocumentByCertificateId(Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate not found with id: " + certificateId));

        List<Document> documents = documentRepository.findByCertificate(certificate);
        return documents.stream()
                .map(certificateMapper::toDocumentDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteDocumentById(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(()-> new DocumentNotFoundException("Document not found"+id));
        try {
            Files.deleteIfExists(Path.of(document.getFilePath()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file: " + e.getMessage());
        }

        documentRepository.delete(document);
    }
}
