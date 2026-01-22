import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IDocument {
  id: string;
  filename: string;
  uploadDate: Date;
  fileType: string;
  size: number;
  content?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  uploadDocument(file: File): Observable<IDocument> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IDocument>(`${this.apiUrl}/upload`, formData);
  }

  uploadResume(file: File): Observable<IDocument> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<IDocument>(`${this.apiUrl}/upload-resume`, formData);
  }

  getAllDocuments(): Observable<IDocument[]> {
    return this.http.get<IDocument[]>(this.apiUrl);
  }

  getDocumentById(id: string): Observable<IDocument> {
    return this.http.get<IDocument>(`${this.apiUrl}/${id}`);
  }

  deleteDocument(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
