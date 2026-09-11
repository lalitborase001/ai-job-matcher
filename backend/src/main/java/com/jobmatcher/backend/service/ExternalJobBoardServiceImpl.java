package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.response.JobResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class ExternalJobBoardServiceImpl {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Value("${adzuna.api.id}")
    private String appId;

    @Value("${adzuna.api.key}")
    private String apiKey;

    private final String BASE_URL = "https://api.adzuna.com/v1/api/jobs/in/search/1";

    public ExternalJobBoardServiceImpl() {
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }

    public List<JobResponse> fetchLiveJobs(String title, String location) {
        List<JobResponse> liveJobs = new ArrayList<>();

        try {
            String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8.toString());
            String encodedLocation = URLEncoder.encode(location, StandardCharsets.UTF_8.toString());

            String url = String.format("%s?app_id=%s&app_key=%s&what=%s&where=%s&results_per_page=12&sort_by=date",
                    BASE_URL, appId, apiKey, encodedTitle, encodedLocation);

            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            System.out.println("ADZUNA RAW RESPONSE: " + response.getBody());

            JsonNode root = objectMapper.readTree(response.getBody());
            JsonNode results = root.path("results");

            if (results.isArray()) {
                for (JsonNode node : results) {
                    JobResponse job = new JobResponse();
                    job.setId((long) (Math.random() * 100000));
                    job.setTitle(node.path("title").asText());
                    job.setCompany(node.path("company").path("display_name").asText());
                    job.setLocation(node.path("location").path("display_name").asText());
                    job.setDescription(node.path("description").asText());

                    liveJobs.add(job);
                }
            }
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }

        return liveJobs;
    }
}