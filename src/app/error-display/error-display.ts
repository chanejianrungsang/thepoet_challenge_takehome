import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-display',
  imports: [CommonModule],
  templateUrl: './error-display.html',
  styleUrl: './error-display.scss'
})
export class ErrorDisplay {
  error = input<string>('');
}
