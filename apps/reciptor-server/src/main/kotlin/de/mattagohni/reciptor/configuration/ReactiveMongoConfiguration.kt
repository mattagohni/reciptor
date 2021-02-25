package de.mattagohni.reciptor.configuration

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableReactiveMongoRepositories
@Configuration
class ReactiveMongoConfiguration : AbstractReactiveMongoConfiguration() {

  @Bean
  fun mongoClient(): MongoClient {
    return MongoClients.create()
  }

  override fun getDatabaseName(): String {
    return "reciptor"
  }
}
