package org.example.service;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.parser.apache.pdfbox.ApachePdfBoxDocumentParser;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import org.springframework.stereotype.Service;

import java.io.InputStream;

@Service
public class DocumentService {

    private final EmbeddingStoreIngestor ingestor;

    public DocumentService(EmbeddingStore<TextSegment> embeddingStore, EmbeddingModel embeddingModel) {
        // Setup the Ingestion Pipeline
        this.ingestor = EmbeddingStoreIngestor.builder()
                .documentSplitter(DocumentSplitters.recursive(500, 50)) // Split into 500-character chunks
                .embeddingModel(embeddingModel)
                .embeddingStore(embeddingStore)
                .build();
    }

    public void ingestPdf(InputStream pdfStream) {
        try {
            Document document = new ApachePdfBoxDocumentParser().parse(pdfStream);
            ingestor.ingest(document);
            System.out.println("Document ingested successfully!");
        } catch (Exception e) {
            throw new RuntimeException("Failed to ingest PDF", e);
        }
    }
}