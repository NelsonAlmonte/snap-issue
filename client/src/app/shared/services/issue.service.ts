import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { CreateIssueDto } from '../dto/create-issue.dto';
import { environment } from 'src/environments/environment';
import { Issue } from '../interfaces/issue.interface';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  issues$ = new BehaviorSubject<Issue[]>([]);

  constructor(private http: HttpClient) {}

  getIssues(): Issue[] {
    return this.issues$.getValue();
  }

  fetchIssues() {
    return this.http
      .get<Issue[]>(`${environment.apiUrl}issue`)
      .pipe(tap((issues) => this.issues$.next(issues)));
  }

  createIssue(issue: CreateIssueDto) {
    return this.http.post<Issue>(`${environment.apiUrl}issue`, issue).pipe(
      tap((createdIssue) => {
        const currentIssues = this.getIssues();
        currentIssues.push(createdIssue);
        this.issues$.next(currentIssues);
      })
    );
  }
}
