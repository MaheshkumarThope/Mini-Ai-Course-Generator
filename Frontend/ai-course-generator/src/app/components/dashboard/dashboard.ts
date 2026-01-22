import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService, ICourse } from '../../services/course';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  courses: ICourse[] = [];
  loading = false;
  error: string | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loading = true;
    this.error = null;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load courses';
        console.error(err);
        this.loading = false;
      },
    });
  }

  getCoursesByLevel(level: string): ICourse[] {
    return this.courses.filter((course) => course.level === level);
  }
}
