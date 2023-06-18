package com.rproject.forest.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*

@Entity
@Table(name = "challenges")
data class Challenge(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    val title: String = "",

    @Column(nullable = false)
    val description: String = "",

    @Column(nullable = false)
    val difficulty: Int = 0,

    @Column(name = "position_x", nullable = false)
    val positionX: Float = 0.0f,

    @Column(name = "position_y", nullable = false)
    val positionY: Float = 0.0f,

    @Column(nullable = false)
    val kingApproved: Boolean = false,

    @Column(nullable = false)
    val psychologistApproved: Boolean = false,

    @ManyToMany(mappedBy = "challenges")
    @JsonIgnore
    val routes: List<Route> = emptyList()
)