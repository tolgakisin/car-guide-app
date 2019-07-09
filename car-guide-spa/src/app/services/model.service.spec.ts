/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelService } from './model.service';

describe('Service: Model', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelService]
    });
  });

  it('should ...', inject([ModelService], (service: ModelService) => {
    expect(service).toBeTruthy();
  }));
});
