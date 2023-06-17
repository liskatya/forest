package com.rproject.forest.service

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import com.rproject.forest.repo.NotificationRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class NotificationService(private val repo: NotificationRepository) {
    fun post(notification: Notification) {
        repo.save(notification)
    }

    fun getAllByType(type: NotificationType): List<Notification> {
        return repo.findAllByTypeAndProcessed(type)
    }

    fun get(id: Long): Optional<Notification> {
        return repo.findById(id)
    }

    fun update(notification: Notification): Optional<Notification> {
        val notificationOpt = get(notification.id)
        if (notificationOpt.isEmpty) {
            return Optional.empty()
        }

        return try {
            val updatedNotification = repo.save(notification)
            Optional.of(updatedNotification)
        } catch (e: Exception) {
            Optional.empty()
        }
    }
}