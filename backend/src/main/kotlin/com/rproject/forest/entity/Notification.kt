package com.rproject.forest.entity

import jakarta.persistence.*

@Entity
@Table(name = "Notifications")
data class Notification(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val userId: Long = 0,

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    val type: NotificationType = NotificationType.None,

    @Column(nullable = false)
    val processed: Boolean = false
)