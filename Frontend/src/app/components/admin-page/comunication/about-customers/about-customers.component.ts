import { Component, Input } from '@angular/core';
import { Customers } from '../customers.model';

@Component({
  selector: 'app-about-customers',
  templateUrl: './about-customers.component.html',
  styleUrls: ['./about-customers.component.scss']
})
export class AboutCustomersComponent {
  @Input() customer!: Customers;
  isActive: boolean[] = [false, false, false, false];
  onClickTracking(index: number) {
    // Toggle active/inactive state of clicked li element
    const li = document.querySelectorAll('.progressbar li')[index];
    if (this.isActive[index]) {
      this.isActive[index] = false;
      li.classList.remove('active');
    
      for (let i = index + 1; i < this.isActive.length; i++) {
        this.isActive[i] = false;
        li.classList.remove('active');
      }

    } else {
      // Check if any previous li elements are still active
      let hasActivePrev = false;
      for (let i = index +1; i < 0; i++) {
        if (this.isActive[i]) {
          hasActivePrev = true;
          break;
        }
      }
      for (let i = index - 1; i < 0; i++) {
        this.isActive[i] = true;
        li.classList.add('active');
      }
      if (!hasActivePrev) {
        // No active previous li elements, set current li element as active
        this.isActive[index] = true;
        li.classList.add('active');
       
      }
      
    }
  }

}
