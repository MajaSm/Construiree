import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customers } from '../customers.model';
import { Observable, of } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
@Input() customer!: Customers
@Input() selectedIndex?: number;
@Output() filterSelection = new EventEmitter<string>();
@Output() searchText = new EventEmitter<string>();
isActive: boolean[] = [false, false, false, false];
searchQuery: string = '';


constructor() { }
search() {
  this.searchText.emit(this.searchQuery);
}
resetFilter() {
  this.searchQuery='';
  this.searchText.emit(this.searchQuery);
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
