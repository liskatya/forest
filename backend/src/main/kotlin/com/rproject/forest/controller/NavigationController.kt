package com.rproject.forest.controller

import com.rproject.forest.entity.Challenge
import com.rproject.forest.entity.Route
import com.rproject.forest.service.NavigationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/navigation")
class NavigationController(private val navigationService: NavigationService) {

    @PostMapping("challenge")
    fun createChallenge(@RequestBody challenge: Challenge): ResponseEntity<Challenge> {
        val res = navigationService.createChallenge(challenge)
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @GetMapping("challenge/all")
    fun getAllChallenges(): ResponseEntity<List<Challenge>> {
        return ResponseEntity.ok().body(navigationService.getAllChallenges())
    }

    @PostMapping("route")
    fun createRoute(@RequestBody route: Route): ResponseEntity<Route> {
        val res = navigationService.createRoute(route)
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @GetMapping("route/{userId}")
    fun getRouteByUserId(@PathVariable userId: Long): ResponseEntity<Route> {
        val res = navigationService.getRouteByUserId(userId)
        if (res.isEmpty) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok().body(res.get())
    }
}