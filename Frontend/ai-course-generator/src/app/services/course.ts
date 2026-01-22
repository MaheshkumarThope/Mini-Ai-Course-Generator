import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICourse {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  prerequisites?: string[];
  relevanceScore?: number;
}

export interface IRecommendation {
  courses: ICourse[];
  summary: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.apiUrl);
  }

  getCourseById(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.apiUrl}/${id}`);
  }

  generateCourse(topic: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/generate`, {
      params: { topic: topic }
    });
  }

  getRecommendedCourses(prompt: string): Observable<IRecommendation> {
    return this.http.post<IRecommendation>(`${this.apiUrl}/recommend`, { prompt: prompt });
  }

  createCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.apiUrl, course);
  }
}
