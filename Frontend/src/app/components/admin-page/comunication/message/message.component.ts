import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from '../customers.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() customer!: Customers;
  @Output() backClicked = new EventEmitter<void>();
  message: string = '';
  messageInput: any;
  isMessageEmpty: string=''
  messageInputValue: any;
  constructor(private route: ActivatedRoute) { }

 
  onBackClicked() {
    this.backClicked.emit();
  }
  
  isDisabled(): boolean {
    
    return !this.messageInputValue;
  }
  sendMessage(text: string) {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).split('/').join('.');
    const senderName = 'Ti'; // assume sender is always the user
    const time = now.toLocaleTimeString();
    this.customer.messageFromAdmin.push({ senderName, time, text, formattedDate });
    this.messageInputValue = false;
    this.messageInputValue =''
    return this.messageInput === '';
  }
}
