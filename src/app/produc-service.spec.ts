import { TestBed } from '@angular/core/testing';
import { ProducService } from './produc-service';

describe('ProducService', () => {
  let service: ProducService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
