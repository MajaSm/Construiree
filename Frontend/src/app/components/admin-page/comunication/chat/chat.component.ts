import { Component, Input, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/components/shared/search.service';
import { Customers } from '../customers';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [SearchService]
})
export class ChatComponent {
  @Input() customers!:Customers;
  selectedConversation: any;
  clickedOnCustomer=false;
  filterSelected!:any;
  selectedFilterIndex!: number;

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
