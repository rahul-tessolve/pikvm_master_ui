import { TestBed } from '@angular/core/testing';

import { DeviceaddService } from './deviceadd.service';

describe('DeviceaddService', () => {
  let service: DeviceaddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceaddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
