import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dashboard } from './components/dashboard/dashboard';
import { DocumentUpload } from './components/document-upload/document-upload';
import { CourseSuggestions } from './components/course-suggestions/course-suggestions';
import { IDocument } from './services/document';
import { IRecommendation } from './services/course';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Dashboard, DocumentUpload, CourseSuggestions],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeTab = signal<'dashboard' | 'upload' | 'recommendations'>('dashboard');
  recommendations: IRecommendation | null = null;
  uploadedResume: IDocument | null = null;

  setActiveTab(tab: 'dashboard' | 'upload' | 'recommendations') {
    this.activeTab.set(tab);
  }

  onResumeUploaded(resume: IDocument): void {
    this.uploadedResume = resume;
  }

  onRecommendationsReceived(recommendations: IRecommendation): void {
    this.recommendations = recommendations;
    this.setActiveTab('recommendations');
  }
}
