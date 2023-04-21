import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
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
 
  formIsValid?  = false;
  eventForm: FormGroup;
  timepicker: any;
  events!: Event[];
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEventDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: [''],
      allDay: [false],
      time: ['', Validators.required],
      endTime:[''],
    });
  }

  weekendsDateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (!date) {
      return false;
    }
    const day = date.getDay();
    return day !== 0 ;
  }

  updateFormValidity() {
    const titleValid = this.eventForm.get('title')?.valid;
    const timeValid = this.eventForm.get('time')?.valid; 
    const startValid = this.eventForm.get('start')?.valid;


    if (titleValid && timeValid && startValid) {
      this.formIsValid = true;
    } else {
      this.formIsValid = false;
    }
  
  }

ngOnInit() {
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


