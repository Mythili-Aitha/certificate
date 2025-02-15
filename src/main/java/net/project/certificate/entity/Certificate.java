package net.project.certificate.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import net.project.certificate.entity.Document;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "certifications")


public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "certification_name", nullable = false)
    private String certificationName;
    @Column(name = "issued_by", nullable = false)
    private String issuedBy;
    @Column(name = "license_number")
    private String licenseNumber;
    @Column(name = "url")
    private String url;
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
    @Column(name = "status", columnDefinition = "VARCHAR(20) DEFAULT 'ACTIVE'", nullable = true)
    private String status="ACTIVE";
    @Column(name = "file_path")
    private String filePath;
    @OneToMany(mappedBy = "certificate", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Document> documents = new ArrayList<>();
    @Transient
    private Long remainingDays;

    @PrePersist
    @PreUpdate
    public void calculateRemainingDays() {
        if(endDate!=null){
            this.remainingDays = Math.max(ChronoUnit.DAYS.between(LocalDate.now(), this.endDate), 0);
        }
    }

}
