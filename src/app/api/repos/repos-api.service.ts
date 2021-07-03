import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { DataSource, Repository } from './repos-dto';

@Injectable({providedIn: 'root'})
export class ReposApiService {

  private readonly baseUrl = 'https://api.github.com/';

  constructor(private http: HttpClient) { }

  getRepositories(name: string, language = '', stars = 0, issue = '', page = 1, perPage = 25) : Observable<DataSource<Repository>> {
    let query = '';
    if (name) {
      query += encodeURIComponent(`${name} in:name`);
    }

    if (language !== '') {
      query += encodeURIComponent(` language:${language}`);
    }
    if (stars) {
      query += encodeURIComponent(` stars:>=${stars}`);
    }
    if (issue) {
      query += encodeURIComponent(`good-first-issues:>1 ${issue}`)
    }
    return this.http.get<any>(`${this.baseUrl}search/repositories?q=${query}&page=${page}&per_page=${perPage}`)
      .pipe(
        catchError((res: HttpErrorResponse) => {
          alert(res.error.message);
          return of(null);
        }),
        filter(res => res),
        map(res => ({
          ...res,
          items: res.items?.map((item: any) => ({
            id: item.id,
            name: item.name,
            full_name: item.full_name,
            created_at: item.created_at,
            avatar_url_owner: item.owner.avatar_url
          }))
        })
      )
    );
  }
}
