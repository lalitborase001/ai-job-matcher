package com.jobmatcher.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String skills;
    private String description;
    private String location;

    private String source;
    private String sourceUrl;
    private String employmentType;
    private String experience;
    private LocalDateTime postedDate;

    @OneToMany(mappedBy = "job" , cascade = CascadeType.ALL)
    @JsonIgnore
    private List<JobApplication> jobApplications = new ArrayList<>();
}
