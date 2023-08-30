import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { CreateIssueDto } from '../dto/create-issue.dto';

interface Issue {
  id: number;
  categoryId: number;
  image: string;
  latitude: string;
  longitude: string;
  created_at: string | null;
  reporterId: number;
}
@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issues$ = new BehaviorSubject<Issue[]>([]);

  constructor(private http: HttpClient) {}

  getIssues(): Issue[] {
    return this.issues$.getValue();
  }

  createIssue(issue: CreateIssueDto) {
    return this.http.post<Issue>(`http://localhost:3000/issue`, issue).pipe(
      tap((createdIssue) => {
        const currentIssues = this.getIssues();
        currentIssues.push(createdIssue);
        this.issues$.next(currentIssues);
      })
    );
  }
}
