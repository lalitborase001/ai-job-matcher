package com.jobmatcher.backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateJobRequest {

    private String title;

    private String company;

    private String skills;

    private String description;

    private String location;
}