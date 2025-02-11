package net.project.certificate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class DocumentDto {
    private Long id;
    private String fileName;
    private String filePath;
    private LocalDateTime uploadedAt;
}
