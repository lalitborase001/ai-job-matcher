package com.jobmatcher.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobResponse {

    private Long id;

    private String title;

    private String company;

    private String skills;

    private String description;

    private String location;
}