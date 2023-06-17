package com.rproject.forest.repo

import com.rproject.forest.entity.Route
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RouteRepository: JpaRepository<Route, Long> {
    fun findByUserId(id: Long): Optional<Route>
}