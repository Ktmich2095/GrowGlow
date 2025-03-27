import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdGeneratorService {
  private ultimoId = 0;

  generarId(): number {
    this.ultimoId++;
    return this.ultimoId;
  }
}