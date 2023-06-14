package com.rproject.forest.entity

import jakarta.persistence.*

@Entity
@Table(name = "Users")
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long = 0,

        @Column(nullable = false)
        val password: String = "",

        @Column(nullable = false)
        val name: String = "",

        @Column(nullable = false, unique = true)
        val email: String = "",

        @Column(nullable = false)
        @Enumerated(EnumType.STRING)
        val role: Role = Role.NONE,

        @Column(nullable = false)
        @Enumerated(EnumType.STRING)
        val personalityType: PersonalityType = PersonalityType.NONE
)
