import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { DataSource } from '../repos/repos-dto';
import { Commits } from './commits-dto';

@Injectable({providedIn: 'root'})
export class CommitsApiService {

  private readonly baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) { }

  getCommits(repo: string, page = 1, perPage = 25) : Observable<DataSource<Commits>> {
    const query = encodeURIComponent(`test repo:${repo}`);

    return this.http.get<any>(`${this.baseUrl}search/commits?q=${query}&page=${page}&per_page=${perPage}`,
      {
        headers: new HttpHeaders().set('Accept', 'application/vnd.github.cloak-preview')
      })
      .pipe(
        catchError((res: HttpErrorResponse) => {
          alert(res.error.message);
          return of(null);
        }),
        filter(res => res),
        map(res => ({
          ...res,
          items: res.items?.map((item: any) => ({
            author: item.author?.avatar_url,
            url: item.url,
            commitMessage: item.commit?.message
          }))
        })
      )
    );
  }

}
