package com.rproject.forest.service

import com.rproject.forest.entity.*
import com.rproject.forest.repo.ChallengeRepository
import com.rproject.forest.repo.ChallengeResultRepo
import com.rproject.forest.repo.RouteRepository
import com.rproject.forest.repo.UserRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList
import kotlin.collections.HashMap

@Service
class NavigationService(private val challengeRepo: ChallengeRepository,
                        private val routeRepo: RouteRepository,
                        private val userRepo: UserRepository,
                        private val notificationService: NotificationService,
                        private val challengeResultRepo: ChallengeResultRepo) {

    private val logger: Logger = LoggerFactory.getLogger(NavigationService::class.java)

    fun createChallenge(challenge: Challenge): Optional<Challenge> {
        return try {
            val res = challengeRepo.save(challenge)
            val notification = Notification(0, res.id, NotificationType.ChallengeUploaded)
            notificationService.post(notification)
            Optional.of(res)
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun updateChallenge(challenge: Challenge): Optional<Challenge> {
        val res = challengeRepo.findById(challenge.id)
        if (res.isEmpty) {
            return Optional.empty()
        }

        val dbChallenge = res.get()
        val updatedChallenge = Challenge(
            dbChallenge.id,
            dbChallenge.title,
            dbChallenge.description,
            dbChallenge.difficulty,
            dbChallenge.positionX,
            dbChallenge.positionY,
            challenge.kingApproved,
            challenge.psychologistApproved,
            dbChallenge.routes)

        return try {
            Optional.of(challengeRepo.save(updatedChallenge))
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun approveChallenge(id: Long, approvedByKing: Boolean): Optional<Challenge> {
        val res = challengeRepo.findById(id)
        if (res.isEmpty) {
            return Optional.empty()
        }

        val dbChallenge = res.get()
        if (approvedByKing) {
            dbChallenge.kingApproved = true
        } else {
            dbChallenge.psychologistApproved = true
        }

        return try {
            Optional.of(challengeRepo.save(dbChallenge))
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun rejectChallenge(id: Long, approvedByKing: Boolean): Optional<Challenge> {
        val res = challengeRepo.findById(id)
        if (res.isEmpty) {
            return Optional.empty()
        }

        val notification = Notification(0, id, NotificationType.ChallengeRejected)
        notificationService.post(notification)

        return try {
            Optional.of(res.get())
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

    fun getChallenge(id: Long): Optional<Challenge> {
        return challengeRepo.findById(id)
    }

    fun completeChallenge(routeId: Long, challengeId: Long): Optional<Challenge> {
        val challenge = challengeRepo.findById(challengeId)
        val route = routeRepo.findById(routeId)

        if (challenge.isEmpty || route.isEmpty) {
            return Optional.empty()
        }

        val challengeResult = ChallengeResult(0, route.get(), challenge.get(), route.get().user)
        val savedResult = challengeResultRepo.save(challengeResult)

        val notification = Notification(0, savedResult.id, NotificationType.ChallengeCompleted)
        notificationService.post(notification)

        return try {
            Optional.of(challenge.get())
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun getChallengeCompletionPercent(personType: PersonalityType): Float {
        val challengesRes = challengeResultRepo.findAll()
        val routes = routeRepo.findAll()
        var completedChallenges = 0.0f
        var allChallenges = 0.000001f

        for (chRes in challengesRes) {
            if (chRes.user.personalityType == personType) {
                completedChallenges += 1
            }
        }

        for (route in routes) {
            for (routeChallenge in route.challenges) {
                allChallenges += 1
            }
        }

        return completedChallenges / allChallenges
    }

    fun getChallengeCompletionPercent(challengeId: Long): Float {
        val challenge = challengeRepo.findById(challengeId)
        if (challenge.isEmpty) {
            return 0.0f
        }
        val challengeResults = challengeResultRepo.findAllByChallenge(challenge.get())
        val routes = routeRepo.findAll()
        var completedChallenges = 0.0f
        var allChallenges = 0.000001f

        for (chRes in challengeResults) {
            completedChallenges += 1
        }

        for (route in routes) {
            for (routeChallenge in route.challenges) {
                allChallenges += 1
            }
        }

        return completedChallenges / allChallenges
    }

    fun assignReward(challengeResultId: Long, reward: Long): Optional<User> {
        val chRes = challengeResultRepo.findById(challengeResultId)
        if (chRes.isEmpty) {
            return Optional.empty()
        }
        val user = chRes.get().user
        user.coins += reward

        return try {
            val savedUser = userRepo.save(user)
            Optional.of(savedUser)
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }

    fun expandRoute(challengeResultId: Long, challengeId: Long): Optional<Route> {
        val chRes = challengeResultRepo.findById(challengeResultId)
        val ch = challengeRepo.findById(challengeId)
        if (ch.isEmpty || chRes.isEmpty) {
            return Optional.empty()
        }

        val routeOpt = routeRepo.findById(chRes.get().route.id)
        if (routeOpt.isEmpty) {
            return Optional.empty()
        }

        val route = routeOpt.get()
        val challenge = ch.get()
        val chArray = route.challenges.toMutableList()
        chArray.add(challenge)
        route.challenges = chArray

        return try {
            Optional.of(routeRepo.save(route))
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
    }
}