package com.rproject.forest.service

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import com.rproject.forest.repo.NotificationRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class NotificationService(private val repo: NotificationRepository) {

    private val logger: Logger = LoggerFactory.getLogger(NotificationService::class.java)
    fun post(notification: Notification): Optional<Notification> {
        return try {
            val res = repo.save(notification)
            Optional.of(res)
        } catch (e: Exception) {
            logger.error(e.toString())
            Optional.empty()
        }
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