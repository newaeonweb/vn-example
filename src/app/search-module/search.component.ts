import { Component, OnInit } from '@angular/core';
import {Observable, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap, catchError} from 'rxjs/operators';
import { AirportService } from './_services/airport.service';

@Component({
  selector: 'vn-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  model: any = {};
  isSearchingTerm: boolean;
  searchTermFailed: boolean;
  listFormatter = (location: any) => location.Name;

  constructor(private airportList: AirportService) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.isSearchingTerm = true),
      switchMap(term => this.airportList.get(term).pipe(
        tap((response) => {
          if (response) {
            this.isSearchingTerm = false;
            this.searchTermFailed = false;
          } else {
            this.isSearchingTerm = false;
            this.searchTermFailed = true;
          }
        }),
        catchError((error) => {
          this.searchTermFailed = true;
          return of([]);
        }))
      ),
      tap(() => this.isSearchingTerm = false)
  )

  ngOnInit() {
  }

}
