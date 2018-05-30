import { TestBed, inject } from '@angular/core/testing';

import { AssemblyService } from './assembly.service';

describe('AssemblyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssemblyService]
    });
  });

  it('should be created', inject([AssemblyService], (service: AssemblyService) => {
    expect(service).toBeTruthy();
  }));
});
