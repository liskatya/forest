package com.rproject.forest.service

import com.rproject.forest.entity.User
import org.springframework.stereotype.Service
import java.util.*

@Service
class UserService(private val userRepository: UserRepository) {
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
}