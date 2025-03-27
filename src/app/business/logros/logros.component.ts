import { Component } from '@angular/core';

@Component({
  selector: 'app-logros',
  standalone: true,
  imports: [],
  templateUrl: './logros.component.html',
  styleUrl: './logros.component.css'
})
export class LogrosComponent {
  // Aquí podrías gestionar la lógica de las rachas y mostrar información dinámica
  currentStreak = 7; // Ejemplo de racha activa
  streakHistory = [
    { date: '2025-03-21', duration: '7 días', achievement: 'Máximo de riego diario' },
    { date: '2025-03-14', duration: '5 días', achievement: 'Regó con precisión' },
  ];
}
