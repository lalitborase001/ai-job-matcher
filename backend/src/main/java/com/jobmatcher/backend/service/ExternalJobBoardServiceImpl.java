package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.JobResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

@Service
public class ExternalJobBoardServiceImpl {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    // TODO: In a production app, move these to application.properties
    private final String APP_ID = "YOUR_ADZUNA_APP_ID"; 
    private final String API_KEY = "YOUR_ADZUNA_API_KEY";
    private final String BASE_URL = "https://api.adzuna.com/v1/api/jobs/us/search/1";

    public ExternalJobBoardServiceImpl() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<JobResponse> fetchLiveJobs(String title, String location) {
        List<JobResponse> liveJobs = new ArrayList<>();
        
        try {
            // 1. Build the API URL dynamically based on user search
            String url = String.format("%s?app_id=%s&app_key=%s&what=%s&where=%s&results_per_page=10", 
                    BASE_URL, APP_ID, API_KEY, title, location);

            // 2. Make the HTTP GET request to the external job board
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

            // 3. Parse the JSON response
            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode results = root.path("results");

            // 4. Map the external data to YOUR clean JobResponse DTO
            if (results.isArray()) {
                for (JsonNode node : results) {
                    JobResponse job = new JobResponse();
                    // Generate a temporary mock ID for frontend rendering
                    job.setId((long) (Math.random() * 10000)); 
                    job.setTitle(node.path("title").asText());
                    job.setCompany(node.path("company").path("display_name").asText());
                    job.setLocation(node.path("location").path("display_name").asText());
                    job.setDescription(node.path("description").asText());
                    
                    liveJobs.add(job);
                }
            }
        } catch (Exception e) {
            System.err.println("Failed to fetch external jobs: " + e.getMessage());
        }

        return liveJobs;
    }
}