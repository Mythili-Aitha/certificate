package net.project.certificate.controller;

import net.project.certificate.dto.DocumentDto;
import net.project.certificate.service.DocumentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private DocumentService documentService;
    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }

    @PostMapping("/upload/{certificateId}")
    public ResponseEntity<List<DocumentDto>> uploadDocument(
            @PathVariable Long certificateId,
            @RequestParam("files") List<MultipartFile> files) {
        List<DocumentDto> uploadedDocs = files.stream()
                .map(file -> documentService.uploadDocument(certificateId, file))
                .collect(Collectors.toList());

        return ResponseEntity.ok(uploadedDocs);
    }

    @GetMapping("/certificate/{certificateId}")
    public ResponseEntity<List<DocumentDto>> getDocumentByCertificateId(@PathVariable Long certificateId) {
        return ResponseEntity.ok(documentService.getDocumentByCertificateId(certificateId));
    }

    @DeleteMapping("/{documentId}")
    public ResponseEntity<String> deleteDocumentById(@PathVariable Long documentId) {
        documentService.deleteDocumentById(documentId);
        return ResponseEntity.ok("Document deleted successfully.");
    }

}
