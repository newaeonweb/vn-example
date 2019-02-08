import { TestBed } from '@angular/core/testing';

import { AirportService } from './airport.service';
import { HttpClientModule } from '@angular/common/http';

describe('AirportService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AirportService = TestBed.get(AirportService);
    expect(service).toBeTruthy();
  });
});
