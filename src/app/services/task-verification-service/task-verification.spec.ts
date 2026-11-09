import { TestBed } from '@angular/core/testing';

import { TaskVerification } from './task-verification';

describe('TaskVerification', () => {
  let service: TaskVerification;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskVerification);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
