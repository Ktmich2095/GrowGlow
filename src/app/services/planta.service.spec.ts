import { TestBed } from '@angular/core/testing';

import { PlantaService } from '../core/services/planta.service';

describe('PlantaService', () => {
  let service: PlantaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
