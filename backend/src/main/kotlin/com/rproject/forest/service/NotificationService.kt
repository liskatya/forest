package com.rproject.forest.service

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import com.rproject.forest.repo.NotificationRepository
import org.springframework.stereotype.Service

@Service
class NotificationService(private val repo: NotificationRepository) {
    fun post(notification: Notification) {
        repo.save(notification)
    }

    fun getAllByType(type: NotificationType): List<Notification> {
        return repo.findAllByTypeAndProcessed(type)
    }
}