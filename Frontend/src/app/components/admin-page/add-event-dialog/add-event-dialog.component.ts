import { AfterViewInit, Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFilterFn, MatDatepicker } from '@angular/material/datepicker';

import { NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { CustomDateAdapter } from 'src/app/components/admin-page/custom-date-adapter';
@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'hr-HR' },
   ]
})

export class AddEventDialogComponent {

  @Output() addEvent = new EventEmitter<any>(); // <-- define the event emitter
  @Output() closeDialog: EventEmitter<any> = new EventEmitter(); 

  @ViewChild('picker') picker!: MatDatepicker<Date>;
  @ViewChild(MatCheckbox) allDayCheckbox!: MatCheckbox;
  eventData: any;
  formIsValid?  = false;
  eventForm: FormGroup;
  timepicker: any;
  events!: Event[];
  isEditMode!:boolean;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      name:['', Validators.required],
      surname:['', Validators.required],
      start: ['', Validators.required],
      count:['', Validators.required],
      end: [''],
      allDay: [false],
      time: ['', Validators.required],
      endTime:[''],
    });
    this.eventData = data.eventData; 
  }
 
  weekendsDateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 ;
  }

  updateFormValidity() {
    const nameValid = this.eventForm.get('name')?.valid;
    const surname = this.eventForm.get('surname')?.valid;
    const timeValid = this.eventForm.get('time')?.valid; 
    const startValid = this.eventForm.get('start')?.valid;
    const materialValid = this.eventForm.get('material')?.valid; 
    const countValid = this.eventForm.get('count')?.valid;
    const addressValid = this.eventForm.get('address')?.valid;


    if (nameValid && timeValid && startValid && materialValid && countValid && addressValid && surname) {
      this.formIsValid = true;
    } else {
      this.formIsValid = false;
    }
  
  }

ngOnInit() {
   this.isEditMode = false;
    if (this.eventData) {
      this.isEditMode = true;
      const [date, time] = this.eventData.start.split('T');
      const justTime = time.substring(0, 5); 
      // If event data exists, populate the form group with the data
      this.eventForm = this.fb.group({
        name: [this.eventData.extendedProps.name, Validators.required],
        surname: [this.eventData.extendedProps.surname, Validators.required],
        address: [this.eventData.extendedProps.address, Validators.required],
        material: [this.eventData.extendedProps.material, Validators.required],
        count: [this.eventData.extendedProps.count, Validators.required],
        start: [this.eventData.start, Validators.required],
        end: [this.eventData.end],
        allDay: [this.eventData.allDay],
        time: [justTime, Validators.required],
        endTime: [this.eventData.endTime],
      });
    } else {
      // If event data is null, create a new form group
      this.eventForm = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        address: ['', Validators.required],
        material: ['', Validators.required],
        count: ['', Validators.required],
        start: ['', Validators.required],
        end: [''],
        allDay: [false],
        time: ['', Validators.required],
        endTime: [''],
      });
    }
    
    this.eventForm.valueChanges.subscribe(() => {
      this.updateFormValidity();
  });
}

  onClose(): void {
    this.dialogRef.close();
    this.closeDialog.emit(); // Emit the closeDialog event
  }
  onSubmit() {
    if (this.eventForm.valid) {
      console.log(this.eventForm)
      this.addEvent.emit(this.eventForm.value); 
      this.onClose()// <-- emit the event with the form data
    }
  }

 
}


