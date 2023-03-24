import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventInput } from '@fullcalendar/core';
import { EventModel } from '../event.model';
import * as moment from 'moment';
import { MatCheckbox } from '@angular/material/checkbox';
@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.scss']
})
export class AddEventDialogComponent {
  @Output() addEvent: EventEmitter<EventModel> = new EventEmitter();

  @ViewChild(MatCheckbox) allDayCheckbox!: MatCheckbox;
  eventForm: FormGroup;
  timepicker: any;
  events!: EventModel[];

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      allDay: [false],
      time: ['']
    });
  }
  openTimepicker(): void {
    const dialogRef = this.timepicker.open();
    dialogRef.afterClosed().subscribe((selectedTime: string) => {
      if (selectedTime) {
        this.eventForm.get('time')!.setValue(selectedTime);
      }
    });
  }
 
  onSubmit() {
    // Get form input values
    const title = this.eventForm.value.title;
    const startDate = this.eventForm.value.start;
    const endDate = this.eventForm.value.end;
    const allDay = this.eventForm.value.allDay;
    const time = this.eventForm.value.time;
  
    // Set start date with time if time is available, otherwise set it to start of day
    let start = new Date(startDate);
    if (time) {
      const [hours, minutes] = time.split(':');
      start.setHours(hours);
      start.setMinutes(minutes);
    } else {
      start = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    }
  
    // Set end date with time if time is available, otherwise set it to end of day
    let end = new Date(endDate);
    if (time) {
      const [hours, minutes] = time.split(':');
      end.setHours(hours);
      end.setMinutes(minutes);
    } else {
      end = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59);
    }
  
    // Create new event object
    const newEvent: EventModel = {
      title: title,
      start: start,
      end: end,
      allDay: allDay,
      color: 'purple'
    };
  
    // Add new event to events array
    this.events.push(newEvent);
  
    // Reset form
    this.eventForm.reset();
  }
  
  
  
}


