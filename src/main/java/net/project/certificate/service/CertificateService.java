package net.project.certificate.service;

import net.project.certificate.dto.CertificateDto;
import org.springframework.data.domain.Page;

public interface CertificateService {
    CertificateDto createCertificate(CertificateDto certificateDto);

    CertificateDto getCertificate(Long certificateId);

    Page<CertificateDto> getAllCertificates(String search, String sortBy, int page, int pageSize);

    CertificateDto updateCertificate(Long certificateId,CertificateDto updateCertificate);

    void deleteCertificate(Long certificateId);
}
