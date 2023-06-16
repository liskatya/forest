package com.rproject.forest.repo

import com.rproject.forest.entity.Notification
import com.rproject.forest.entity.NotificationType
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface NotificationRepository : JpaRepository<Notification, Long> {
    fun findAllByTypeAndProcessed(type: NotificationType, processed: Boolean = false): List<Notification>
}