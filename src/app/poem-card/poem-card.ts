import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poem } from '../poetry.service';

@Component({
  selector: 'app-poem-card',
  imports: [CommonModule],
  templateUrl: './poem-card.html',
  styleUrl: './poem-card.scss'
})
export class PoemCard {
  @Input() poem!: Poem;
  @Output() viewFull = new EventEmitter<Poem>();
  copied = false;

  get isTruncated(): boolean {
    return this.poem && this.poem.lines && this.poem.lines.length > 12;
  }

  get displayLines(): string[] {
    if (!this.poem || !this.poem.lines) return [];
    return this.isTruncated ? this.poem.lines.slice(0, 12) : this.poem.lines;
  }

  onViewFull() {
    this.viewFull.emit(this.poem);
  }

  async copyPoem() {
    const text = `${this.poem.title} — ${this.poem.author}\n\n${this.poem.lines.join('\n')}`;
    try {
      if (navigator && 'clipboard' in navigator) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      this.copied = true;
      setTimeout(() => (this.copied = false), 1500);
    } catch (e) {
      console.error('Copy failed', e);
    }
  }
}
