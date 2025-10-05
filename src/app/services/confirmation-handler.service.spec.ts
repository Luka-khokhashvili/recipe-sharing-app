import { TestBed } from '@angular/core/testing';

import { ConfirmationHandlerService } from './confirmation-handler.service';

describe('ConfirmationHandlerService', () => {
  let service: ConfirmationHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
