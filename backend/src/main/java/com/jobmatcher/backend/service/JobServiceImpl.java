package com.jobmatcher.backend.service;

import com.jobmatcher.backend.dto.request.CreateJobRequest;
import com.jobmatcher.backend.dto.response.JobResponse;
import com.jobmatcher.backend.dto.response.RecommendedJobResponse;
import com.jobmatcher.backend.entity.CandidateProfile;
import com.jobmatcher.backend.entity.Job;
import com.jobmatcher.backend.exception.JobNotFoundException;
import com.jobmatcher.backend.repository.CandidateProfileRepository;
import com.jobmatcher.backend.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService{

    private final JobRepository jobRepository;
    private final CandidateProfileRepository candidateProfileRepository;

    @Override
    public JobResponse createJob(CreateJobRequest request) {
        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setCompany(request.getCompany());
        job.setSkills(request.getSkills());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());

        Job savedJob = jobRepository.save(job);

        return new JobResponse(
                savedJob.getId(),
                savedJob.getTitle(),
                savedJob.getCompany(),
                savedJob.getSkills(),
                savedJob.getDescription(),
                savedJob.getLocation()
        );
    }

    @Override
    public Job getJobById(Long id) throws Exception {
        return jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job updateJob(Long id, Job job) throws Exception {

        Job existingJob = jobRepository.findById(id).orElseThrow(() -> new JobNotFoundException("Job not found"));

        existingJob.setTitle(job.getTitle());
        existingJob.setCompany(job.getCompany());
        existingJob.setSkills(job.getSkills());
        existingJob.setDescription(job.getDescription());
        existingJob.setLocation(job.getLocation());

        return jobRepository.save(existingJob);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }



    @Override
    public List<RecommendedJobResponse> getRecommendedJobsForUser(Long userId) throws Exception {

        // 1. Fetch the user's aggregated AI profile
        CandidateProfile profile = candidateProfileRepository.findByUserId(userId).orElse(null);

        // If the user hasn't uploaded a resume yet, return an empty list
        if (profile == null || profile.getSkills() == null || profile.getSkills().isEmpty()) {
            return Collections.emptyList();
        }

        // 2. Extract user skills into a clean list
        List<String> userSkills = Arrays.stream(profile.getSkills().split(","))
                .map(String::trim)
                .map(String::toLowerCase)
                .toList();

        // 3. Fetch all active jobs from the database
        List<Job> allJobs = jobRepository.findAll();
        List<RecommendedJobResponse> recommendations = new ArrayList<>();

        // 4. The Fast-Match Algorithm
        for (Job job : allJobs) {
            // Null safety check for job descriptions
            String jobDesc = job.getDescription() != null ? job.getDescription().toLowerCase() : "";
            int matchCount = 0;

            // Count how many of the user's skills appear in the job description
            for (String skill : userSkills) {
                if (!skill.isEmpty() && jobDesc.contains(skill)) {
                    matchCount++;
                }
            }

            // 5. Calculate Score & Filter
            if (matchCount > 0) {
                // Calculate percentage based on user's total skills
                double rawScore = ((double) matchCount / userSkills.size()) * 100.0;

                // Cap the fast-match score at 95% (save 100% for the deep Gemini AI analysis)
                double finalScore = Math.min(rawScore, 95.0);

                // Round to 1 decimal place
                finalScore = Math.round(finalScore * 10.0) / 10.0;

                // Only recommend jobs with at least a 20% baseline match
                if (finalScore >= 20.0) {
                    recommendations.add(new RecommendedJobResponse(
                            job.getId(),
                            job.getTitle(),
                            job.getCompany(),
                            job.getLocation(),
                            finalScore,
                            "Matches " + matchCount + " of your core skills"
                    ));
                }
            }
        }

        // 6. Sort by highest score descending and return the Top 10
        recommendations.sort((a, b) -> Double.compare(b.getMatchScore(), a.getMatchScore()));

        return recommendations.stream().limit(10).collect(Collectors.toList());
    }
}
