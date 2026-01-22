package org.example.service;

import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.memory.chat.MessageWindowChatMemory;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.embedding.onnx.allminilml6v2.AllMiniLmL6V2EmbeddingModel;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RagConfig {

    // 1. Initialize the Local Embedding Model (Runs on your CPU, no API cost)
    @Bean
    EmbeddingModel embeddingModel() {
        return new AllMiniLmL6V2EmbeddingModel();
    }

    // 2. Initialize an In-Memory Vector Store to hold your PDF chunks
    @Bean
    EmbeddingStore<TextSegment> embeddingStore() {
        return new InMemoryEmbeddingStore<>();
    }

    // 3. Create the Content Retriever (The bridge between Store and AI)
    @Bean
    ContentRetriever contentRetriever(EmbeddingStore<TextSegment> embeddingStore, EmbeddingModel embeddingModel) {
        return EmbeddingStoreContentRetriever.builder()
                .embeddingStore(embeddingStore)
                .embeddingModel(embeddingModel)
                .maxResults(5) // Retrieve top 5 most relevant chunks for better context
                .minScore(0.5) // Lower threshold to get more context
                .build();
    }

    // 4. Create the AI Service (The high-level interface)
    @Bean
    CourseAssistant courseAssistant(ChatLanguageModel chatLanguageModel, ContentRetriever contentRetriever) {
        return AiServices.builder(CourseAssistant.class)
                .chatLanguageModel(chatLanguageModel)
                .contentRetriever(contentRetriever) // Inject RAG capability here
                .chatMemory(MessageWindowChatMemory.withMaxMessages(10))
                .build();
    }
}