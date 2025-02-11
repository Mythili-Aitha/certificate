package net.project.certificate.service;

import net.project.certificate.dto.CertificateDto;
import net.project.certificate.entity.Certificate;
import net.project.certificate.entity.Document;
import net.project.certificate.exception.CertificateNotFoundException;
import net.project.certificate.mapper.CertificateMapper;
import net.project.certificate.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class CertificateServiceImpl implements CertificateService {

    private final CertificateRepository certificateRepository;
    private final CertificateMapper certificateMapper;

    @Autowired
    public CertificateServiceImpl(CertificateRepository certificateRepository, CertificateMapper certificateMapper) {
        this.certificateRepository = certificateRepository;
        this.certificateMapper = certificateMapper;
    }


    @Override
    public CertificateDto createCertificate(CertificateDto certificateDto) {
        Certificate certificate = certificateMapper.toCertificate(certificateDto);
        Certificate savedCertificate = certificateRepository.save(certificate);
        return certificateMapper.toCertificateDto(savedCertificate);
    }

    @Override
    public CertificateDto getCertificate(Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate is not found with that id:" + certificateId));
        return certificateMapper.toCertificateDto(certificate);
    }

    @Override
    public List<CertificateDto> getAllCertificates(String search, String sortBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, sortBy != null ? sortBy : "startDate");

        List<Certificate> certificates;

        if (search != null && !search.isEmpty()) {
            certificates = certificateRepository.findByCertificationNameContainingIgnoreCase(search, sort);
        } else {
            certificates = certificateRepository.findAll(sort);
        }

        return certificates.stream()
                .map(certificateMapper::toCertificateDto)
                .collect(Collectors.toList());
    }

    @Override
    public CertificateDto updateCertificate(Long certificateId,CertificateDto updateCertificate) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate is not found with that id:" + certificateId));
        certificate.setCertificationName(updateCertificate.getCertificationName());
        certificate.setIssuedBy(updateCertificate.getIssuedBy());
        certificate.setLicenseNumber(updateCertificate.getLicenseNumber());
        certificate.setUrl(updateCertificate.getUrl());
        certificate.setStartDate(updateCertificate.getStartDate());
        certificate.setEndDate(updateCertificate.getEndDate());
        certificate.setStatus(updateCertificate.getStatus());
        certificate.setRemainingDays(Math.max(java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), certificate.getEndDate()),0));
        if(updateCertificate.getDocuments() != null && !updateCertificate.getDocuments().isEmpty()) {
            List<Document> updatedDocuments = updateCertificate.getDocuments()
                    .stream()
                    .map(dto -> certificateMapper.toDocumentEntity(dto, certificate)) // ✅ Convert DTOs to Entity
                    .collect(Collectors.toList());
            certificate.setDocuments(updatedDocuments);
        }
        return certificateMapper.toCertificateDto(certificateRepository.save(certificate));
    }

    @Override
    public void deleteCertificate(Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate is not found with that id:" + certificateId));
        certificateRepository.delete(certificate);
    }


}
