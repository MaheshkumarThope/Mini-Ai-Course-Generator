import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentService, IDocument } from '../../services/document';
import { CourseService, IRecommendation } from '../../services/course';

export interface IModule {
  moduleNumber: number;
  moduleTitle: string;
  moduleDescription: string;
  topics: string[];
}

export interface IDetailedCourse {
  courseTitle: string;
  courseDescription: string;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedDuration: string;
  modules: IModule[];
  keySkillsGained: string[];
}

export interface ICourseDetail {
  title: string;
  description: string;
  whyValuable: string;
  estimatedTime: string;
  careerImpact: string;
}

@Component({
  selector: 'app-document-upload',
  imports: [CommonModule],
  templateUrl: './document-upload.html',
  styleUrl: './document-upload.css',
})
export class DocumentUpload implements OnInit {
  @Output() resumeUploaded = new EventEmitter<IDocument>();
  @Output() recommendationsReceived = new EventEmitter<IRecommendation>();

  documents: IDocument[] = [];
  uploadedResume: IDocument | null = null;
  loading = false;
  uploading = false;
  error: string | null = null;
  successMessage: string | null = null;
  recommendations: IRecommendation | null = null;
  
  // Course display
  parsedCourses: ICourseDetail[] = [];
  expandedCourseIndex: number | null = null;
  detailedCourses: IDetailedCourse[] = [];
  selectedCourseIndex: number | null = null;
  expandedModuleIndex: number | null = null;
  
  // Tab/View state
  activeTab: 'simple' | 'detailed' = 'simple';
  
  // Caching
  recommendationsHistory: { timestamp: Date; courses: ICourseDetail[] }[] = [];
  showHistory = false;


  constructor(
    private documentService: DocumentService,
    private courseService: CourseService
  ) {
    this.loadRecommendationsFromCache();
  }

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.loading = true;
    this.documentService.getAllDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load documents';
        console.error(err);
        this.loading = false;
      },
    });
  }

  onFileSelected(event: Event, isResume: boolean = false): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.uploadFile(file, isResume);
    }
  }

  uploadFile(file: File, isResume: boolean = false): void {
    this.uploading = true;
    this.error = null;
    this.successMessage = null;

    const uploadMethod = isResume
      ? this.documentService.uploadResume(file)
      : this.documentService.uploadDocument(file);

    uploadMethod.subscribe({
      next: (document) => {
        this.uploading = false;
        this.successMessage = `${file.name} uploaded successfully!`;
        
        if (isResume) {
          this.uploadedResume = document;
          this.resumeUploaded.emit(document);
          console.log('Resume uploaded, requesting recommendations...');
          this.getRecommendations(file);
        } else {
          this.documents.push(document);
        }

        // Clear message after 5 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
      },
      error: (err) => {
        this.uploading = false;
        this.error = `Failed to upload ${file.name}`;
        console.error('Upload error:', err);
      },
    });
  }

  getRecommendations(resumeFile: File): void {
    // Use a simple prompt for the AI to use the RAG context
    const prompt = `Based on the uploaded resume/document that has been ingested into the system, 
please provide 5 personalized course recommendations that will help the candidate:
1. Secure better job opportunities
2. Fill skill gaps
3. Advance their career
4. Learn in-demand technologies

For each recommendation include:
- Course title
- Why it's valuable for their career
- Estimated time to complete
- Expected career impact`;

    console.log('Sending recommendation request to backend');
    this.uploading = true;
    
    this.courseService.getRecommendedCourses(prompt).subscribe({
      next: (recommendations) => {
        console.log('Recommendations received successfully:', recommendations);
        this.uploading = false;
        this.recommendations = recommendations;
        
        // Parse the recommendations into structured courses
        this.parseCourses(recommendations);
        
        this.successMessage = 'Recommendations generated successfully!';
        this.recommendationsReceived.emit(recommendations);
        
        // Clear message after 3 seconds
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.error('Error getting recommendations:', err);
        this.uploading = false;
        this.error = 'Failed to get recommendations. Please try again.';
        if (err.error && err.error.error) {
          console.error('Server error:', err.error.error);
        }
      },
    });
  }

  parseCourses(recommendations: IRecommendation): void {
    this.parsedCourses = [];
    
    if (recommendations.courses && recommendations.courses.length > 0) {
      const description = recommendations.courses[0]?.description || '';
      
      // Parse the structured course data from the description
      const courseRegex = /###\s*\d+\.\s*\*\*Course Title:\s*([^*]+)\*\*\s*-\s*\*\*Why it's valuable for your career:\*\*\s*([^-]+)\s*-\s*\*\*Estimated time to complete:\*\*\s*([^-]+)\s*-\s*\*\*Expected career impact:\*\*\s*([^#]+)/g;
      
      let match;
      while ((match = courseRegex.exec(description)) !== null) {
        const course: ICourseDetail = {
          title: match[1].trim(),
          description: description.substring(0, 100) + '...',
          whyValuable: match[2].trim(),
          estimatedTime: match[3].trim(),
          careerImpact: match[4].trim()
        };
        this.parsedCourses.push(course);
      }
    }
    
    // Save to cache
    this.saveCoursesToCache();
    
    console.log('Parsed courses:', this.parsedCourses.length);
  }

  toggleCourse(index: number): void {
    this.expandedCourseIndex = this.expandedCourseIndex === index ? null : index;
  }

  deleteDocument(id: string): void {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          this.documents = this.documents.filter((doc) => doc.id !== id);
          this.successMessage = 'Document deleted successfully!';
          setTimeout(() => {
            this.successMessage = null;
          }, 3000);
        },
        error: (err) => {
          this.error = 'Failed to delete document';
          console.error(err);
        },
      });
    }
  }

  // Caching Methods
  saveCoursesToCache(): void {
    if (this.parsedCourses.length > 0) {
      const cached = {
        timestamp: new Date(),
        courses: this.parsedCourses
      };
      this.recommendationsHistory.unshift(cached);
      
      // Keep only last 10 recommendations
      if (this.recommendationsHistory.length > 10) {
        this.recommendationsHistory.pop();
      }
      
      // Save to localStorage
      localStorage.setItem('courseRecommendations', JSON.stringify(this.recommendationsHistory));
      console.log('Courses cached:', this.recommendationsHistory.length);
    }
  }

  loadRecommendationsFromCache(): void {
    const cached = localStorage.getItem('courseRecommendations');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        this.recommendationsHistory = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        console.log('Loaded cached recommendations:', this.recommendationsHistory.length);
      } catch (e) {
        console.error('Failed to load cached recommendations:', e);
      }
    }
  }

  viewCachedRecommendation(index: number): void {
    if (index >= 0 && index < this.recommendationsHistory.length) {
      this.parsedCourses = this.recommendationsHistory[index].courses;
      this.expandedCourseIndex = null;
      this.showHistory = false;
    }
  }

  clearHistory(): void {
    if (confirm('Clear all recommendation history?')) {
      this.recommendationsHistory = [];
      localStorage.removeItem('courseRecommendations');
      this.successMessage = 'History cleared';
      setTimeout(() => {
        this.successMessage = null;
      }, 3000);
    }
  }

  // Detailed Course Methods
  selectCourse(index: number): void {
    this.selectedCourseIndex = this.selectedCourseIndex === index ? null : index;
    this.expandedModuleIndex = null;
  }

  toggleModule(moduleIndex: number): void {
    this.expandedModuleIndex = this.expandedModuleIndex === moduleIndex ? null : moduleIndex;
  }

  addDetailedCourse(course: IDetailedCourse): void {
    this.detailedCourses.push(course);
  }

  clearDetailedCourses(): void {
    this.detailedCourses = [];
    this.selectedCourseIndex = null;
  }
}
