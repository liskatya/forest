package com.rproject.forest.service

import com.rproject.forest.entity.*
import com.rproject.forest.repo.ChallengeResultRepo
import com.rproject.forest.repo.UserRepository
import org.springframework.stereotype.Service
import java.util.*
import kotlin.collections.ArrayList

@Service
class UserService(private val userRepository: UserRepository,
                  private val notificationService: NotificationService,
                  private val challengeResultRepo: ChallengeResultRepo) {
    fun saveUser(user: User): Optional<User> {
        val userOpt = userRepository.findByEmail(user.email)
        if (userOpt.isPresent) {
            return Optional.empty()
        }
        return Optional.of(userRepository.save(user))
    }

    fun getUser(email: String): Optional<User> {
        return userRepository.findByEmail(email)
    }

    fun getUserByName(nickname: String): Optional<User> {
        return userRepository.findByName(nickname)
    }

    fun getUser(id: Long): Optional<User> {
        return userRepository.findById(id)
    }

    fun getCompletedChallenges(id: Long): List<Challenge> {
        val userOpt = getUser(id)
        if (userOpt.isEmpty) {
            return listOf()
        }

        val user = userOpt.get()
        val res = challengeResultRepo.findAllByUser(user)
        val challengesList = ArrayList<Challenge>()
        for (chRes in res) {
            challengesList.add(chRes.challenge)
        }
        return challengesList
    }

    fun updateUser(user: User): Optional<User> {
        val userToUpdate = getUser(user.id)
        if (userToUpdate.isEmpty) {
            return Optional.empty()
        }
        return Optional.of(userRepository.save(user))
    }

    fun uploadTestResult(user: User): Boolean {
        val res = updateUser(user)
        if (res.isEmpty) {
            return false
        }

        val updatedUser = res.get()
        val notification = Notification(0, updatedUser.id, NotificationType.TestResultUploaded)
        notificationService.post(notification)
        return true
    }
}