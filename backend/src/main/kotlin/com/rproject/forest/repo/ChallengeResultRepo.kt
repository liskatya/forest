package com.rproject.forest.repo

import com.rproject.forest.entity.ChallengeResult
import com.rproject.forest.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChallengeResultRepo : JpaRepository<ChallengeResult, Long> {
    fun findAllByUser(user: User): List<ChallengeResult>
}