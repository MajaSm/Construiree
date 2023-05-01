import { Component, Input } from '@angular/core';
import { CustomersComponent } from '../comunication/customers/customers.component';
import { ShareService } from '../share.service';

import { CUSTOMERS } from '../comunication/customer.data';
import { Customers } from '../comunication/customers.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
   numOfTotalOrders=0;
   numOfApprovedCustomers=0
   numOfInPendingCustomers=0
   numOfDeniedCustomers=0
   customers= CUSTOMERS
  constructor(private shareService: ShareService) {}

  ngOnInit() {
    this.customers.forEach(customer => {
      this.numOfTotalOrders += 1
      if ('Odobreno' === customer.ticket) {
        this.numOfApprovedCustomers += 1
      }
      if ('U obradi' === customer.ticket) {
        this.numOfInPendingCustomers += 1
      }
      if ('Odbijeno' === customer.ticket) {
        this.numOfDeniedCustomers += 1
      }
    });
   
   
  }
}
