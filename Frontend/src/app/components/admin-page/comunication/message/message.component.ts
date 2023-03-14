import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../customers';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() customer!: Customers;
  @Output() backClicked = new EventEmitter<void>();
  
  onBackClicked() {
    this.backClicked.emit();
  }
  
}
