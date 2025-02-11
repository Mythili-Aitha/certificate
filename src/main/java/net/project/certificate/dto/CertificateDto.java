package net.project.certificate.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class CertificateDto {

    private Long id;
    private String certificationName;
    private String issuedBy;
    private String licenseNumber;
    private String url;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private Long remainingDays;
    private List<DocumentDto> documents;

    public List<String> getFilePaths() {
        return documents != null ? documents.stream()
                .map(DocumentDto::getFilePath)
                .collect(Collectors.toList()) : null;
    }
}
