import { Component, ViewChild } from '@angular/core';
import { CalendarOptions,EventInput, Calendar  } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AddEventDialogComponent } from 'src/app/components/admin-page/add-event-dialog/add-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EventModel } from 'src/app/components/admin-page/event.model';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  events: EventModel[] = [
    {
      title: 'My Event',
      start: new Date('2023-03-20T14:30:00'),
      allDay: false,
      color: 'orange'
    }
  ];
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    buttonText: {
      dayGridMonth: 'Month',
      timeGridWeek: 'Week',
      timeGridDay: 'Day'
    },
    headerToolbar:{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    height: '900px',
    slotDuration: '00:15:00', // 15 minutes time slots
    slotLabelInterval: '01:00:00',
    eventColor: 'green',
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      hour12: false
    },
    slotMinTime: '08:00:00',
  slotMaxTime: '20:00:00',
    eventTimeFormat: {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    },
    eventSources: [this.events]
   
  };
  constructor(private dialog: MatDialog) { }

  eventsPromise!: Promise<EventInput>;
  handleDateClick(info: DateClickArg) {
      // Open the dialog to allow the user to add an event
 
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  onAddEvent(event: EventModel) {
    this.events.push(event);
  }
  openAddEventDialog(): void {
    const newEvent: EventModel = {
      title: '',
      start: new Date(),
      end: new Date(),
      allDay: false,
      color: 'purple'
    };
  
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      data: {
        events: this.events
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.events.push(result);
        console.log(this.events);
      }
    });
  }
}
