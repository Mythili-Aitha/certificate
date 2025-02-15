package net.project.certificate.controller;

import net.project.certificate.dto.DocumentDto;
import net.project.certificate.entity.Document;
import net.project.certificate.service.DocumentService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {
    private final DocumentService documentService;

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

    @GetMapping("/uploads/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            String UPLOAD_DIR = "uploads/";
            Path filePath = Paths.get(UPLOAD_DIR).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType;
                try {
                    contentType = Files.probeContentType(filePath);
                    if (contentType == null) {
                        contentType = "application/octet-stream"; // Default if null
                    }
                } catch (IOException e) {
                    System.err.println("Failed to determine content type: " + e.getMessage());
                    contentType = "application/octet-stream"; // Fallback type
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                System.out.println("File not found in expected location!");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
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

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestBody Map<String, String> request) {
        if (!request.containsKey("filePath")) {
            return ResponseEntity.badRequest().body("Missing filePath in request.");
        }

        String filePath = request.get("filePath");

        if (filePath == null || filePath.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid file path.");
        }

        try {
            // Decode file path in case of spaces or special characters
            filePath = URLDecoder.decode(filePath, StandardCharsets.UTF_8);

            // Ensure we extract only the filename, not extra directory paths
            String filename = Paths.get(filePath).getFileName().toString();

            // Find document in the database
            Document document = documentService.findByFileName(filename);

            if (document != null) {
                documentService.deleteDocumentById(document.getId());  // Delete from DB
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Document not found.");
            }

            // Delete file from the system
            File file = new File("uploads/" + filename); // ✅ Ensure correct path
            if (file.exists() && file.delete()) {
                return ResponseEntity.ok("File deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to delete file from server.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file deletion: " + e.getMessage());
        }
    }
}
