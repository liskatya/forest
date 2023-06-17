package com.rproject.forest.service

import com.rproject.forest.entity.Challenge
import com.rproject.forest.entity.Route
import com.rproject.forest.repo.ChallengeRepository
import com.rproject.forest.repo.RouteRepository
import com.rproject.forest.repo.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class NavigationService(private val challengeRepo: ChallengeRepository,
                        private val routeRepo: RouteRepository,
                        private val userRepo: UserRepository) {

    private val logger: Logger = LoggerFactory.getLogger(NavigationService::class.java)

    fun createChallenge(challenge: Challenge): Optional<Challenge> {
        return try {
            val res = challengeRepo.save(challenge)
            Optional.of(res)
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun getAllChallenges(): List<Challenge> {
        return challengeRepo.findAll()
    }

    fun createRoute(route: Route): Optional<Route> {
        val challengesIds = mutableListOf<Long>()
        for (challenge in route.challenges) {
            challengesIds.add(challenge.id)
        }

        val challenges = challengeRepo.findAllByIdIn(challengesIds)
        val user = userRepo.findById(route.user.id).get()

        val persistedRoute = Route(0, route.name, challenges, user)

        return try {
            val res = routeRepo.save(persistedRoute)
            Optional.of(res)
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun getRouteByUserId(userId: Long): Optional<Route> {
        return routeRepo.findByUserId(userId)
    }
}