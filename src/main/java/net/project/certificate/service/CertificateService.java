package net.project.certificate.service;

import net.project.certificate.dto.CertificateDto;

import java.util.List;

public interface CertificateService {
    CertificateDto createCertificate(CertificateDto certificateDto);

    CertificateDto getCertificate(Long certificateId);

    List<CertificateDto> getAllCertificates(String search, String sortBy);

    CertificateDto updateCertificate(Long certificateId,CertificateDto updateCertificate);

    void deleteCertificate(Long certificateId);
}
