package com.rproject.forest.repo

import com.rproject.forest.entity.ChallengeResult
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ChallengeResultRepo : JpaRepository<ChallengeResult, Long> {
}