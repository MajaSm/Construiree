import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { filterCallback } from 'chart.js/dist/core/core.plugins';
import { Customers } from '../customers.model';
import { CUSTOMERS } from '../customer.data';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent {
  @Output() selectedConversation = new EventEmitter<any>();
 @Input() filter:any;
 @Input() searchQuery: string = '';
  constructor(){}
 customers= CUSTOMERS
  filteredCustomers: Customers[] =[];
 
  onFilterSelected(filter: string) {
    switch (filter) {
      case 'newRequest':
         this.filteredCustomers = this.customers.filter(customer => customer.ticket === 'Novi zahtjev');
         break;
        
      case 'pending':
          this.filteredCustomers = this.customers.filter(customer => customer.ticket === 'U obradi');
        break;
      case 'approved':
         this.filteredCustomers = this.customers.filter(customer => customer.ticket === 'Odobreno');
        break;
      case 'denied':
          this.filteredCustomers = this.customers.filter(customer => customer.ticket === 'Odbijeno');
        break;
        case 'resetFilter':
          this.filteredCustomers = this.customers;
          break;
      default:
          this.filteredCustomers = this.customers;
    }
  }
 
  ngOnChanges(changes: SimpleChanges) {
    this.onFilterSelected(this.filter)
    
    if (changes['customers']) {
      this.filteredCustomers = this.customers.filter(customer => {
        const fullName = customer.wholeName.toLowerCase().includes(this.searchQuery.toLowerCase());
        const subjectMatch = customer.subject.toLowerCase().includes(this.searchQuery.toLowerCase());
        const ticketMatch = customer.ticket.toLowerCase().includes(this.searchQuery.toLowerCase());
        const idMatch = customer.id.toLowerCase().includes(this.searchQuery.toLowerCase());
        const timeMatch = customer.requestedTime.toLocaleLowerCase().includes(this.searchQuery.toLowerCase());
  
        return timeMatch || fullName || subjectMatch || ticketMatch || idMatch;
      });
    }
  }
 
  
  assignLetter(ticket: string):string {
    switch (ticket) {
      case 'U obradi':
        return 'fa fa-spinner';
      case 'Novi zahtjev':
        return 'fa fa-arrow-right';
      case 'Odobreno':
        return 'fa fa-check';
      case 'Odbijeno':
        return 'fa fa-times';
      default:
        return 'fa fa-question';
    }
 
  }


  getRandomColor(): string {
    const min = [100, 80, 70]; // minimum RGB values (dark colors)
    const max = [255, 200, 200]; // maximum RGB values (light colors)

    const r = Math.floor(Math.random() * (max[0] - min[0] + 1)) + min[0];
    const g = Math.floor(Math.random() * (max[1] - min[1] + 1)) + min[1];
    const b = Math.floor(Math.random() * (max[2] - min[2] + 1)) + min[2];
    
    
    return `rgb(${r}, ${g}, ${b})`;
  }
 

  ngOnInit() {
    this.customers.forEach(customer => {
      customer['letter'] = this.assignLetter(customer.ticket);
    });
  
    this.customers.forEach(customer => {
      customer.wholeName = `${customer.name} ${customer.surname}`;
      if (!customer.color) {
        customer.color = this.getRandomColor();
      }
    });
   
  }
 
    
  onSelect(customer:any) {
    this.selectedConversation.emit(customer);
  }
 
  /*filterCustomers(searchQuery: string) {
    this.searchCustomers = this.customers.filter((customer) => {
      const name = customer.name.toLowerCase();
      const surname = customer.surname.toLowerCase();
      const subject = customer.subject.toLowerCase();
      const ticket = customer.ticket.toLowerCase();
      const searchLower = searchQuery.toLowerCase();
      return (
        name.includes(searchLower) ||
        surname.includes(searchLower) ||
        subject.includes(searchLower) ||
        ticket.includes(searchLower)
      );
    });
    console.log(this.searchCustomers)
  }*/
}
