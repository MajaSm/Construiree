import { Component, Input, ViewChild } from '@angular/core';
import { Customers } from '../customers.model';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: []
})
export class ChatComponent {
  @Input() customers!:Customers;
  selectedConversation: any;
  clickedOnCustomer=false;
  filterSelected!:any;
  selectedFilterIndex!: number;
   searchText:any;
   searchQuery: string = '';
   onSearchText(query: string) {
    this.searchQuery = query;
  }
  onFilterSelected(filter: string, index:number) {  
    this.filterSelected = filter
    this.selectedFilterIndex = index;
    
  }
  onSelectedConversation(customer:any) {
    this.selectedConversation = customer;
    this.clickedOnCustomer=true;
 
  } 
  onBackClicked() {
    this.clickedOnCustomer = false;
    this.selectedConversation = null;
   
    
  }
}
