import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map} from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class AirportService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  get(term: string): Observable<any> {
    if (term === '' || term.length < 3) {
      return of([]);
    }

    term = term.trim();

    return this.httpClient.get(this.apiUrl + term)
      .pipe(
        map(response => response['Locations']),
        catchError(error => this.errorHandler(error))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

}
