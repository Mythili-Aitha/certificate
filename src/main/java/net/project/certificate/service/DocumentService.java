package net.project.certificate.service;

import net.project.certificate.dto.DocumentDto;
import net.project.certificate.entity.Document;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {
    DocumentDto uploadDocument(Long certificateId, MultipartFile file);

    List<DocumentDto> getDocumentByCertificateId(Long certificateId);

    Document findByFileName(String fileName);

    void deleteDocumentById(Long id);


}
