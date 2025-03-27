import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



interface Usuario {
  nombre: string;
  email: string;
  diasConsecutivos?: number;
  estadoPlanta?: string;
  ultimaActividad?: Date;
  logroActual?: {
    nombre: string;
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent {
  usuario: Usuario = {
    nombre: '',
    email: ''
  };
  loading = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return;

    this.authService.getRachaByUsuario(usuarioId).subscribe({
      next: (response: any) => {
        this.usuario = {
          nombre: this.authService.getUserName() || 'Usuario',
          email: response.email || '',
          diasConsecutivos: response.diasConsecutivos || 0,
          estadoPlanta: response.estadoPlanta || 'Crítico',
          ultimaActividad: response.ultimaActividad ? new Date(response.ultimaActividad) : new Date(),
          logroActual: response.logroActual || { nombre: 'Sin logro' }
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        // Datos mínimos si falla la API
        this.usuario = {
          nombre: this.authService.getUserName() || 'Usuario',
          email: ''
        };
        this.loading = false;
      }
    });
  }

  actualizarRacha() {
    const usuarioId = this.authService.getUsuarioId();
    if (!usuarioId) return;

    this.authService.actualizarActividad(usuarioId).subscribe({
      next: (response: any) => {
        this.usuario.diasConsecutivos = response.diasConsecutivos;
        this.usuario.estadoPlanta = response.estadoPlanta;
      },
      error: (err) => console.error('Error al actualizar:', err)
    });
  }

  cerrarSesion() {
    this.authService.logout();
  }
}
