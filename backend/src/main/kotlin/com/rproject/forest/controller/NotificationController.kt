package com.rproject.forest.controller

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import com.rproject.forest.service.NotificationService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/notification")
class NotificationController(private val service: NotificationService) {

    @GetMapping("/{type}")
    fun getNotification(@PathVariable type: NotificationType): ResponseEntity<List<Notification>> {
        return ResponseEntity.ok().body(service.getAllByType(type))
    }

    @GetMapping("/id/{id}")
    fun getNotification(@PathVariable id: Long): ResponseEntity<Notification> {
        val notification = service.get(id)
        if (notification.isEmpty) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok().body(notification.get())
    }

    @PutMapping
    fun updateNotification(@RequestBody notification: Notification): ResponseEntity<Notification> {
        val notificationOpt = service.update(notification)
        if (notificationOpt.isEmpty) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok().body(notificationOpt.get())
    }

}