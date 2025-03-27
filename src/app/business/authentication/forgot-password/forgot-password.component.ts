// forgot-password.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;
  message: string = '';
  isError: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  submitRequest(): void {
    if (!this.email) {
      this.showMessage('Por favor ingresa tu correo electrónico', true);
      return;
    }
  
    this.isLoading = true;
    this.message = '';
    this.isError = false;
  
    this.authService.requestPasswordReset(this.email).subscribe({
      next: (response: any) => {
        this.showMessage(response.message || 'Se han enviado las instrucciones a tu correo');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error completo:', error);
        const errorMessage = error.error?.message || 
                           'Ocurrió un error al procesar tu solicitud. Intenta nuevamente.';
        this.showMessage(errorMessage, true);
        this.isLoading = false;
      }
    });
  }
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  private showMessage(msg: string, isError: boolean = false): void {
    this.message = msg;
    this.isError = isError;
    setTimeout(() => this.message = '', 5000);
  }
}