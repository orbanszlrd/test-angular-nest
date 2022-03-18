import { TestBed } from '@angular/core/testing';

import { JustifiedLayoutService } from './justified-layout.service';

describe('JustifiedLayoutService', () => {
  let service: JustifiedLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustifiedLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
