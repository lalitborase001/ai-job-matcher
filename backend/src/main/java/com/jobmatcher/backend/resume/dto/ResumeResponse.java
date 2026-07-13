package com.jobmatcher.backend.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponse {

    private String fileName;

    private String downloadUrl;

    private Long size;

    private String message;

}