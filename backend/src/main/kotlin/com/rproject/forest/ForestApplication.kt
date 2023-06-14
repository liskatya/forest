package com.rproject.forest

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.ComponentScan

@SpringBootApplication
@ComponentScan(basePackages = ["com.rproject.forest"])
class ForestApplication

fun main(args: Array<String>) {
	runApplication<ForestApplication>(*args)
}
