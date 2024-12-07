import { TestBed } from '@angular/core/testing';

import { BrandProfileService } from './brand-profile.service';

describe('BrandProfileService', () => {
  let service: BrandProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
