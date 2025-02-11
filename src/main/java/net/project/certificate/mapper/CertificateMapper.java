package net.project.certificate.mapper;

import net.project.certificate.dto.CertificateDto;
import net.project.certificate.dto.DocumentDto;
import net.project.certificate.entity.Certificate;
import net.project.certificate.entity.Document;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CertificateMapper {
    public CertificateDto toCertificateDto(Certificate certificate) {
        CertificateDto dto = new CertificateDto();
        dto.setId(certificate.getId());
        dto.setCertificationName(certificate.getCertificationName());
        dto.setIssuedBy(certificate.getIssuedBy());
        dto.setLicenseNumber(certificate.getLicenseNumber());
        dto.setUrl(certificate.getUrl());
        dto.setStartDate(certificate.getStartDate());
        dto.setEndDate(certificate.getEndDate());
        dto.setStatus(certificate.getStatus());
        dto.setRemainingDays(Math.max(java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), certificate.getEndDate()), 0));

        if (certificate.getDocuments() != null) {
            List<DocumentDto> documentDTOs = certificate.getDocuments()
                    .stream()
                    .map(this::toDocumentDto)
                    .collect(Collectors.toList());
            dto.setDocuments(documentDTOs);
        }
        return dto;
    }

    public Certificate toCertificate(CertificateDto dto) {
        Certificate certificate = new Certificate();
        certificate.setId(dto.getId());
        certificate.setCertificationName(dto.getCertificationName());
        certificate.setIssuedBy(dto.getIssuedBy());
        certificate.setLicenseNumber(dto.getLicenseNumber());
        certificate.setUrl(dto.getUrl());
        certificate.setStartDate(dto.getStartDate());
        certificate.setEndDate(dto.getEndDate());
        certificate.setStatus(dto.getStatus());
        return certificate;
    }

    public DocumentDto toDocumentDto(Document document){
        return new DocumentDto(
                document.getId(),
                document.getFileName(),
                document.getFilePath(),
                document.getUploadedAt()
        );
    }
    public Document toDocumentEntity(DocumentDto dto, Certificate certificate) {
        Document document = new Document();
        document.setId(dto.getId());
        document.setFileName(dto.getFileName());
        document.setFilePath(dto.getFilePath());
        document.setUploadedAt(dto.getUploadedAt());
        document.setCertificate(certificate);
        return document;
    }
}
