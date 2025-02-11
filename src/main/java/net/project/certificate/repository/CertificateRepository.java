package net.project.certificate.repository;

import net.project.certificate.entity.Certificate;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findByCertificationNameContainingIgnoreCase(String search, Sort sortBy);
}

