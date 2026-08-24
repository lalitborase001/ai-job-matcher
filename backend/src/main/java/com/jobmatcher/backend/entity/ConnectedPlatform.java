package com.jobmatcher.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "connected_platforms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConnectedPlatform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String platformName;

    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
