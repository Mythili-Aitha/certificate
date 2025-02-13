package net.project.certificate.service;

import net.project.certificate.dto.CertificateDto;
import net.project.certificate.entity.Certificate;
import net.project.certificate.entity.Document;
import net.project.certificate.exception.CertificateNotFoundException;
import net.project.certificate.mapper.CertificateMapper;
import net.project.certificate.repository.CertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
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
    public Page<CertificateDto> getAllCertificates(String search, String sortBy, int page, int pageSize) {
        Sort sort = Sort.by(Sort.Direction.ASC, sortBy != null ? sortBy : "startDate");
        Pageable pageable = PageRequest.of(page, pageSize, sort);

        Page<Certificate> certificates;

        if (search != null && !search.isEmpty()) {
            certificates = certificateRepository.findByCertificationNameContainingIgnoreCase(search, pageable);
        } else {
            certificates = certificateRepository.findAll(pageable);
        }

        return certificates.map(certificateMapper::toCertificateDto);
    }



    @Override
    public CertificateDto updateCertificate(Long certificateId,CertificateDto updateCertificate) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate is not found with that id:" + certificateId));
//        System.out.println("Updating Certificate ID: " + certificateId);
//        System.out.println("Received Data: " + updateCertificate);

        certificate.setCertificationName(updateCertificate.getCertificationName());
        certificate.setIssuedBy(updateCertificate.getIssuedBy());
        certificate.setLicenseNumber(updateCertificate.getLicenseNumber());
        certificate.setUrl(updateCertificate.getUrl());
        certificate.setStartDate(updateCertificate.getStartDate());
        certificate.setEndDate(updateCertificate.getEndDate());
        certificate.setStatus(updateCertificate.getStatus());
        certificate.setRemainingDays(Math.max(java.time.temporal.ChronoUnit.DAYS.between(java.time.LocalDate.now(), certificate.getEndDate()),0));
        if(updateCertificate.getDocuments() != null) {
//            System.out.println("Updating Documents" + updateCertificate.getDocuments());
            List<Document> updatedDocuments = updateCertificate.getDocuments()
                    .stream()
                    .map(dto -> certificateMapper.toDocumentEntity(dto, certificate))
                    .toList();
            certificate.getDocuments().clear();
            certificate.getDocuments().addAll(updatedDocuments);
        }
        Certificate savedCertificate = certificateRepository.save(certificate);
        return certificateMapper.toCertificateDto(savedCertificate);
    }

    @Override
    public void deleteCertificate(Long certificateId) {
        Certificate certificate = certificateRepository.findById(certificateId)
                .orElseThrow(() -> new CertificateNotFoundException("Certificate is not found with that id:" + certificateId));
        certificateRepository.delete(certificate);
    }


}
