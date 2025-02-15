package net.project.certificate.repository;

import net.project.certificate.entity.Certificate;
import net.project.certificate.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByCertificate(Certificate certificate);
    Optional<Document> findByFileName(String fileName);
}
