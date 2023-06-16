package com.rproject.forest.service

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import com.rproject.forest.entity.PersonalityType
import com.rproject.forest.entity.User
import com.rproject.forest.repo.UserRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository,
                  private val notificationService: NotificationService) {
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

    fun getUser(id: Long): Optional<User> {
        return userRepository.findById(id)
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