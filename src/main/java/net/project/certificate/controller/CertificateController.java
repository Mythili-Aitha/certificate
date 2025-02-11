package net.project.certificate.controller;

import net.project.certificate.dto.CertificateDto;
import net.project.certificate.entity.Certificate;
import net.project.certificate.service.CertificateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin("*")
public class CertificateController {
    private CertificateService certificateService;
    public CertificateController(CertificateService certificateService) {
        this.certificateService = certificateService;
    }

    @PostMapping
    public ResponseEntity<CertificateDto> createCertificate(@RequestBody CertificateDto certificateDto) {
        return ResponseEntity.ok(certificateService.createCertificate(certificateDto));
    }

    @GetMapping
    public ResponseEntity<List<CertificateDto>> getAllCertificates(
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "startDate") String sortBy) {
            return ResponseEntity.ok(certificateService.getAllCertificates(search, sortBy));
    }

    @GetMapping({"id"})
    public ResponseEntity<CertificateDto> getCertificate(@PathVariable Long id) {
        return ResponseEntity.ok(certificateService.getCertificate(id));
    }

    @PutMapping({"id"})
    public ResponseEntity<CertificateDto> updateCertificate(@PathVariable Long id, @RequestBody CertificateDto certificateDto) {
        return ResponseEntity.ok(certificateService.updateCertificate(id, certificateDto));
    }

    @DeleteMapping({"id"})
    public ResponseEntity<Void> deleteCertificate(@PathVariable Long id) {
        certificateService.deleteCertificate(id);
        return ResponseEntity.noContent().build();
    }


}
