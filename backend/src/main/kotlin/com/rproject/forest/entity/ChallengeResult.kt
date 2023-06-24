package com.rproject.forest.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "challenges_result")
data class ChallengeResult(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id", nullable = false)
    val route: Route = Route(),

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "challenge_id", nullable = false)
    val challenge: Challenge = Challenge(),

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User = User()
)
