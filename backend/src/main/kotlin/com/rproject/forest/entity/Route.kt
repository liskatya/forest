package com.rproject.forest.entity

import jakarta.persistence.*

@Entity
@Table(name = "routes")
data class Route(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    val name: String = "",

    @ManyToMany(cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JoinTable(
        name = "route_challenge",
        joinColumns = [JoinColumn(name = "route_id")],
        inverseJoinColumns = [JoinColumn(name = "challenge_id")]
    )
    var challenges: List<Challenge> = emptyList(),

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    val user: User = User()
)
