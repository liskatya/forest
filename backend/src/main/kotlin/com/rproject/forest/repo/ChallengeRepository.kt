package com.rproject.forest.repo

import com.rproject.forest.entity.Challenge
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChallengeRepository: JpaRepository<Challenge, Long> {
    fun findAllByIdIn(id: List<Long>): List<Challenge>
}