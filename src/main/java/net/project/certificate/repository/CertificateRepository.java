package net.project.certificate.repository;

import net.project.certificate.entity.Certificate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Page<Certificate> findByCertificationNameContainingIgnoreCase(String certificationName, Pageable pageable);
}

