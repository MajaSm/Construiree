import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions,EventInput, Calendar  } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { AddEventDialogComponent } from 'src/app/components/admin-page/add-event-dialog/add-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Event } from '../add-event-dialog/events.data';
import * as moment from 'moment';
import { MatTooltip } from '@angular/material/tooltip';
import tippy from 'tippy.js';
import { end, start } from '@popperjs/core';
import hrLocale from '@fullcalendar/core/locales/hr';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements  OnInit{
  @ViewChild(MatTooltip) tooltip!: MatTooltip;
  calendar!: Calendar; // declare the calendar instance
  calendarOptions!: CalendarOptions;
  events: any[] = [
    
  ];
 
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    this.calendarOptions = {
      // your FullCalendar options
      initialView: 'timeGridWeek',
      plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin],
      dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
      locale: hrLocale,
      buttonText: {
        today: 'Danas',
        month: 'Mjesec',
        week: 'Tjedan',
        day: 'Dan',
        list: 'Raspored',
      },
      headerToolbar:{
        left: 'prev,next today addEvent',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      customButtons: {
        addEvent: {
          text: 'Dodaj dogadaj',
          click: () => {
            this.openDialog();
          },
        }
      },
      allDaySlot: false,
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
      events: this.events,
      eventDidMount: function(info) {
        const tooltipContent = info.event.extendedProps['tooltipContent'];
        const tooltip = tippy(info.el, {
          content: tooltipContent,
          allowHTML: true,
          theme: 'tippy'
        });
      },
     
      
    };
  
    // initialize the calendar instance
    const calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(calendarEl!, this.calendarOptions);
   
    this.calendar.render();
  }
  
 
  
  eventsPromise!: Promise<EventInput>;
  handleDateClick(info: DateClickArg) {
      // Open the dialog to allow the user to add an event
 
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
    
  }
  addEvent(event: any) 
  {
    // Combine the date and time to create a new Date object with the correct start time
    const startTime = moment(event.start).format('YYYY-MM-DD') + 'T' + event.time + ':00';
    
    let tempEndTime = moment(event.start).format('YYYY-MM-DD') + 'T' + event.endTime + ':00';
 
    if(!event.endTime){
      tempEndTime = moment(startTime).add(1, 'hour').format();
      event.endTime  = tempEndTime
    }
    console.log(event.endTime)
    this.events.push(event); // <-- push the new event to the events array
    this.calendarOptions.events = this.events;
    this.calendar.addEvent({
      title: event.title,
      start: startTime,
      end: tempEndTime,
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: ${event.title}<br>Time: ${event.time} - ${moment(event.endTime).format('HH:mm')}`,
      }
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px', // Set the dialog width
      data: {} // Pass any data that you want to the dialog
    
    });
    this.calendar.render(); 
  
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      this.calendar.render(); // Call your method to refresh the calendar data here
    });
    dialogRef.componentInstance.addEvent.subscribe((eventData: any) => {
      this.addEvent(eventData);
    });
  }

}


