import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {
  private apiUrl = 'http://localhost:5000/api/usuarios'; // Cambia la ruta al endpoint de usuarios

  constructor(private http: HttpClient) { }

  // Obtener datos del usuario (que ahora incluyen la racha)
  getRachaByUsuario(usuarioId: string) {
    return this.http.get(`${this.apiUrl}/${usuarioId}/racha`);
  }

  // Actualizar actividad (riego)
  actualizarActividad(usuarioId: string) {
    return this.http.put(`${this.apiUrl}/${usuarioId}/racha`, {});
  }
}