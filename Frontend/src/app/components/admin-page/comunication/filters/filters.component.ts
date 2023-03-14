import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchService } from 'src/app/components/shared/search.service';
import { Customers } from '../customers';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
@Input() customer!: Customers
@Input() selectedIndex?: number;
@Output() filterSelection = new EventEmitter<string>();
isActive: boolean[] = [false, false, false, false];

filteredCustomers!: Customers[];
constructor(public searchService: SearchService, ) { }


resetFilter() {
  this.isActive = Array(4).fill(false);
}

onDivClick(index:number) {
  for (let i = 0; i < this.isActive.length; i++) {
    if (i === index) {
      this.isActive[i] = true;
    } else {
      this.isActive[i] = false;
    }
  }
}
}
