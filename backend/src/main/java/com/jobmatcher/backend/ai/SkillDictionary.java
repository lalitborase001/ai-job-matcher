package com.jobmatcher.backend.ai;

import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class SkillDictionary {

    public static final Set<String> SKILLS = Set.of(

            "Java",
            "Spring Boot",
            "Spring Security",
            "Hibernate",
            "JPA",
            "MySQL",
            "PostgreSQL",
            "Docker",
            "Kubernetes",
            "AWS",
            "Azure",
            "React",
            "Angular",
            "Redis",
            "Kafka",
            "RabbitMQ",
            "Microservices",
            "REST API",
            "Git",
            "Maven",
            "Gradle",
            "JUnit",
            "Mockito"
    );

}