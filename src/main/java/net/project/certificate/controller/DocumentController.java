package net.project.certificate.controller;

import net.project.certificate.dto.DocumentDto;
import net.project.certificate.service.DocumentService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private DocumentService documentService;
    private final String UPLOAD_DIR = "uploads/";
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

    @GetMapping("/uploads/{fileName:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(Files.probeContentType(filePath)))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
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
