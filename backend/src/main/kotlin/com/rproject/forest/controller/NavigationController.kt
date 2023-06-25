package com.rproject.forest.controller

import com.rproject.forest.entity.Challenge
import com.rproject.forest.entity.ChallengeResult
import com.rproject.forest.entity.PersonalityType
import com.rproject.forest.entity.Route
import com.rproject.forest.service.NavigationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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

    @PutMapping("challenge")
    fun updateChallenge(@RequestBody challenge: Challenge): ResponseEntity<Challenge> {
        val res = navigationService.updateChallenge(challenge)
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @PostMapping("challenge/{routeId}/{challengeId}/completed")
    fun completeChallenge(@PathVariable routeId: Long, @PathVariable challengeId: Long): ResponseEntity<Challenge> {
        val res = navigationService.completeChallenge(routeId, challengeId)
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @PutMapping("challenge/approve/{id}/{personType}")
    fun approveChallenge(@PathVariable id: Long, @PathVariable personType: String): ResponseEntity<Challenge> {
        val res = navigationService.approveChallenge(id, personType == "King")
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @PutMapping("challenge/reject/{id}/{personType}")
    fun rejectChallenge(@PathVariable id: Long, @PathVariable personType: String): ResponseEntity<Challenge> {
        val res = navigationService.rejectChallenge(id, personType == "King")
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @GetMapping("challenge/all")
    fun getAllChallenges(): ResponseEntity<List<Challenge>> {
        return ResponseEntity.ok().body(navigationService.getAllChallenges())
    }

    @GetMapping("challenge/{id}")
    fun getChallenge(@PathVariable id: Long): ResponseEntity<Challenge> {
        val res = navigationService.getChallenge(id)
        if (res.isEmpty) {
            return ResponseEntity.badRequest().build()
        }
        return ResponseEntity.ok().body(res.get())
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

    @GetMapping("challenge/by_person_type/{personType}/completion_percent")
    fun getCompletionPercentByPersonType(@PathVariable personType: String): ResponseEntity<Float> {
        val res = navigationService.getChallengeCompletionPercent(PersonalityType.valueOf(personType))
        return ResponseEntity.ok().body(res)
    }

    @GetMapping("challenge/{id}/completion_percent")
    fun getChallengeCompletionPercent(@PathVariable id: Long): ResponseEntity<Float> {
        val res = navigationService.getChallengeCompletionPercent(id)
        return ResponseEntity.ok().body(res)
    }

    @PostMapping("route/{challengeResultId}/{newChallengeId}/expand")
    fun expandRoute(@PathVariable challengeResultId: Long, @PathVariable newChallengeId: Long): ResponseEntity<Route> {
        val res = navigationService.expandRoute(challengeResultId, newChallengeId)
        if (res.isEmpty) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok().body(res.get())
    }

    @GetMapping("challenge_result/{id}")
    fun getChallengeResult(@PathVariable id: Long): ResponseEntity<ChallengeResult> {
        val res = navigationService.getChallengeResult(id)
        if (res.isEmpty) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok().body(res.get())
    }
}