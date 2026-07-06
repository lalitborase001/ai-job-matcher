package com.jobmatcher.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobApplicationResponse {

    private Long applicationId;

    private String applicantName;

    private String applicantEmail;

    private String jobTitle;

    private String company;

    private String status;
}