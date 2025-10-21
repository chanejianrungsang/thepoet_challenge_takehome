import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poem } from '../poetry.service';

@Component({
  selector: 'app-poem-modal',
  imports: [CommonModule],
  templateUrl: './poem-modal.html',
  styleUrl: './poem-modal.scss'
})
export class PoemModal {
  @Input() poem!: Poem;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }
}
