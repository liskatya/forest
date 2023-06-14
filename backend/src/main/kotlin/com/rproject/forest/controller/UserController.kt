package com.rproject.forest.controller

import com.rproject.forest.config.WebConstants
import com.rproject.forest.entity.User
import com.rproject.forest.service.UserService
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/user")
class UserController(private val service: UserService) {

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

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        val user = service.getUser(id)
        return if (user.isPresent) {
            ResponseEntity.ok().body(user.get())
        } else {
            ResponseEntity.notFound().build()
        }
    }
}