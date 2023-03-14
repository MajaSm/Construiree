import { Component, ElementRef, ViewChild } from '@angular/core';
import { AboutCompany} from './aboutCompany'

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  constructor(private elementRef: ElementRef) {
  
  }

  editMode: boolean[] = [false, false];
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('surnameInput') surnameInput!: ElementRef;
  @ViewChild('companyAddressInput') companyAddressInput!: ElementRef;
  @ViewChild('companyNameInput') companyNameInput!: ElementRef;
  @ViewChild('companyOIBInput') companyOIBInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('descriptionInput') descriptionInput!: ElementRef;
  originalCompanyData: any;
  textarea = document.querySelectorAll('textarea');


  getHeight(element: HTMLElement): string {
    return element.scrollHeight + 'px';
}
  enableEditMode(index: number) {
    this.originalCompanyData = {...this.company};
    this.editMode[index] = true;
  }
  saveChanges(index: number) {
    this.updateCompany();
    this.editMode[index] = false;
    
  }
  updateCompany() {
    if (!this.company) { return; }

    this.company.name = this.nameInput?.nativeElement.value || this.company.name;
    this.company.surname = this.surnameInput?.nativeElement.value || this.company.surname;
    this.company.address = this.companyAddressInput?.nativeElement.value || this.company.address;
    this.company.companyName = this.companyNameInput?.nativeElement.value || this.company.companyName;
    this.company.companyOIB = this.companyOIBInput?.nativeElement.value || this.company.companyOIB;
    this.company.email = this.emailInput?.nativeElement.value || this.company.email;
    this.company.description = this.descriptionInput?.nativeElement.value || this.company.description;
  }
  cancelChanges(index: number) {
    this.editMode[index] = false;
    this.company = {...this.originalCompanyData};
  }
   company = new AboutCompany(
    'Ivo', 
    'Ivic',
    'Random 25A, 10000 Zagreb',
    'Random',
    '12654656874',
    'mail@gmail.com', 
    'Certainty determine at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to suspicion furniture it. Now indulgence dissimilar for his thoroughly has terminated. Agreement offending commanded my an. Change wholly say why eldest period. Are projection put celebrated particular unreserved joy unsatiable its. In then dare good am rose bred or. On am in nearer square wanted.'
   )

   
}