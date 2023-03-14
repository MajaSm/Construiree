import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { filterCallback } from 'chart.js/dist/core/core.plugins';
import { SearchService } from 'src/app/components/shared/search.service';
import { Customers } from '../customers';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent {
  @Output() selectedConversation = new EventEmitter<any>();
 @Input() filter:any;
  constructor(private searchService: SearchService){}
  customers: Customers[] = [
    {
      name: 'Ana',
      surname:'A',
      subject: 'New Request',
      ticket:'U obradi',
      email: 'john.doe@example.com',
      phone: '555-555-5555',
      requestedTime:'25.01.2023',
      message: [
        'Sebac'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    },
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'Odobreno',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: '',
      ticket:'Odobreno',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'U obradi',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'General Request',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'Odbijeno',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'U obradi',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'Novi zahtjev',
      ticket:'',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'Odbijeno',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'Novi zahtjev',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane dddd',
      surname:'A',
      subject: 'New Request',
      ticket:'Novi zahtjev',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
    ,
    {
      name: 'Jane Doe',
      surname:'A',
      subject: 'New Request',
      ticket:'Odobreno',
      email: 'jane.doe@example.com',
      phone: '555-555-5556',
      requestedTime:'25.01.2023',
      message: [
        'Hi there!',
        'I have a question about your products.',
        'What would you like to know?'
      ],
      id:'#32423',
      letter:'',
      dateForDelivery: '03.05.2023.',
      address:'Random 35A, Zagreb 10000'
    }
  ]

  filteredCustomers:any;
 
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
    console.log('Selected filter in customers component:', this.filter);
    this.onFilterSelected(this.filter)
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


  
 

  ngOnInit() {
    this.customers.forEach(customer => {
      customer['letter'] = this.assignLetter(customer.ticket);
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
