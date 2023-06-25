package com.rproject.forest.controller

import com.rproject.forest.config.WebConstants
import com.rproject.forest.entity.*
import com.rproject.forest.service.NavigationService
import com.rproject.forest.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/user")
class UserController(private val service: UserService,
                     private val navigationService: NavigationService) {
    @PostMapping(path = ["create"], consumes = ["application/json"], produces = ["application/json"])
    fun savePlayer(@RequestBody user: User, request: HttpServletRequest): ResponseEntity<User> {
        val createdUserOpt = service.saveUser(user)
        if (createdUserOpt.isEmpty) {
            request.session.invalidate()
            return ResponseEntity.badRequest().body(user)
        }

        val createdUser = createdUserOpt.get()
        request.session.invalidate()
        request.session.setAttribute(WebConstants.USER_ID, createdUser.id)
        return ResponseEntity.ok().body(createdUser)
    }

    @PostMapping(path = ["signin"], consumes = ["application/json"], produces = ["application/json"])
    fun signInPlayer(@RequestBody user: User, request: HttpServletRequest): ResponseEntity<User> {
        val userOpt = service.getUser(user.email)
        request.session.invalidate()
        if (userOpt.isEmpty) {
            return ResponseEntity.notFound().build()
        }

        val signInUser = userOpt.get()
        if (signInUser.password != user.password) {
            return ResponseEntity.badRequest().build()
        }

        request.session.setAttribute(WebConstants.USER_ID, signInUser.id)
        return ResponseEntity.ok().body(signInUser)
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        val user = service.getUser(id)
        return if (user.isPresent) {
            ResponseEntity.ok().body(user.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/by_nickname/{nickname}")
    fun getUserById(@PathVariable nickname: String): ResponseEntity<User> {
        val user = service.getUserByName(nickname)
        return if (user.isPresent) {
            ResponseEntity.ok().body(user.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/{id}/completed_challenges")
    fun getUserCompletedChallenges(@PathVariable id: Long): ResponseEntity<List<Challenge>> {
        val list = service.getCompletedChallenges(id)
        return if (list.isNotEmpty()) {
            ResponseEntity.ok().body(list)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping(path = ["uploadTest"])
    fun uploadTest(@RequestBody user: User, request: HttpServletRequest): ResponseEntity<User> {
        val res = service.uploadTestResult(user)
        return if (res) {
            ResponseEntity.ok().body(user)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping("{challengeResultId}/{rewardAmount}/assignReward")
    fun assignReward(@PathVariable challengeResultId: Long, @PathVariable rewardAmount: Long): ResponseEntity<User> {
        val res = navigationService.assignReward(challengeResultId, rewardAmount)
        return if (res.isPresent) {
            ResponseEntity.ok().body(res.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }
}