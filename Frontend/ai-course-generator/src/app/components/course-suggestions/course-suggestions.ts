import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, ICourse, IRecommendation } from '../../services/course';

@Component({
  selector: 'app-course-suggestions',
  imports: [CommonModule],
  templateUrl: './course-suggestions.html',
  styleUrl: './course-suggestions.css',
})
export class CourseSuggestions implements OnInit {
  @Input() recommendations: IRecommendation | null = null;
  @Input() resumeContent: string | null = null;

  allCourses: ICourse[] = [];
  loading = false;
  selectedCourse: ICourse | null = null;
  generatedCourse: string | null = null;
  generateLoading = false;
  generatedTopic: string | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    if (!this.recommendations) {
      this.loadAllCourses();
    }
  }

  loadAllCourses(): void {
    this.loading = true;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.allCourses = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading courses', err);
        this.loading = false;
      },
    });
  }

  generateCourseByTopic(topic: string): void {
    if (!topic || topic.trim() === '') {
      alert('Please enter a topic');
      return;
    }

    this.generateLoading = true;
    this.generatedTopic = topic;
    this.courseService.generateCourse(topic).subscribe({
      next: (data) => {
        this.generatedCourse = data;
        this.generateLoading = false;
      },
      error: (err) => {
        console.error('Error generating course', err);
        alert('Failed to generate course. Please try again.');
        this.generateLoading = false;
      },
    });
  }

  selectCourse(course: ICourse): void {
    this.selectedCourse = course;
  }

  closeDetail(): void {
    this.selectedCourse = null;
  }

  enrollCourse(course: ICourse): void {
    alert(`Successfully enrolled in ${course.title}!`);
    this.selectedCourse = null;
  }
}
