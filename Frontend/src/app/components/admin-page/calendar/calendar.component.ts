import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CalendarOptions,EventInput, Calendar, EventApi, EventContentArg  } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { AddEventDialogComponent } from 'src/app/components/admin-page/add-event-dialog/add-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatTooltip } from '@angular/material/tooltip';
import { Tooltip } from 'bootstrap';
import tippy, {animateFill} from 'tippy.js';
import { auto, end, start } from '@popperjs/core';
import hrLocale from '@fullcalendar/core/locales/hr';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements  OnInit{
  @ViewChild(MatTooltip) tooltip!: MatTooltip;
 
  calendar!: Calendar; // declare the calendar instance
  //calendarOptions!: CalendarOptions;
  events: any[] = [
    {
      title: 'aaa',
      start: '2023-04-17T11:00:00',
      end: '',
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: sadaaaaaaaafdsssssssssaaaaaaaaaaaaad <br> sdadasdas`,
        
      },
      
    },
    {
      title: 'bbb',
      start: '2023-04-17T11:00:00',
      end: '',
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: sadaaaaaaaafdssssssssss sssssssss aaaaaaaaaaaaad <br> sdadasdas`,
        id:'1'
      },
      
    },
   
    {
      title: 'cccc',
      start: '2023-04-05T11:00:00',
      end: '',
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: sadaaaaaaaafdssssshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhssssaaaaaaaaaaaaad <br> sdadasdas`,
        id:'2'
      },
      
    },
    
  ];
  eventIdCounter = this.events.length;
  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    
    // initialize the calendar instance
    const calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(calendarEl!, this.calendarOptions);
    this.calendar.render();
   

    document.addEventListener('click', (event) => {
      // check if the clicked element is an edit button inside a Tippy
      const deleteButton = event.target as HTMLElement;
      if (deleteButton.classList.contains('delete-button') && deleteButton.closest('.tippy-content')) {
        // get the ID of the event from the button's data-event-id attribute
        const eventId = deleteButton.getAttribute('data-event-id');
        // call the removeEvent method with the ID of the event to be removed
        this.removeEvent(eventId!);
      }
    });
    
   
      
  }
  calendarOptions: CalendarOptions =  {
    // your FullCalendar options
    initialView: 'dayGridWeek',
    plugins: [dayGridPlugin, interactionPlugin,timeGridPlugin,listWeek],
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
   
    events: this.events,
    allDaySlot: false,
    height: '900px',
    slotDuration: '00:15:00', // 15 minutes time slots
    slotLabelInterval: '01:00:00',
    locale: hrLocale,
    eventColor:'green',
    //contentHeight:auto,
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
      right: 'dayGridMonth dayGridWeek dayGridDay listWeek'
    },
    customButtons: {
      addEvent: {
        text: 'Dodaj dogadaj',
        click: () => {
          this.openDialog();
        },
      }
    },
   
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
   
    eventDidMount: function(info) {
        const tooltipContent = info.event.extendedProps['tooltipContent'];
        const eventId = info.event.extendedProps['id'];
        const tippyInstance = tippy(info.el, {
        placement: 'right',
        allowHTML: true,
        trigger: 'click',
        appendTo: document.body,
        interactive: true,
        animation:'fade',
        interactiveBorder: 30,
        theme:'light',
        maxWidth:300,
        content:  `
            ${tooltipContent}
            <div class="buttons">
            <button class="delete-button buttonInEvent" data-event-id="${eventId}"><i class="fa fa-times" aria-hidden="true"></i></button>
            <button class="edit-button buttonInEvent" data-event-id="${eventId}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>`,
      });
      
      
    },
 

    eventContent: function(info: EventContentArg) {
      return {
        html: `   <div class="event">
          <div class="time">${info.timeText}</div>
          <div class="title">${info.event.title}</div>
        </div>`,
      };
    },
    
  
   
  };


   
  removeEvent(eventId: string) {
    const eventApi = this.calendar.getEventById(eventId);
    if (eventApi) {
      eventApi.remove();
    }
    this.calendar.render();
    console.log('removeEvent: id:' + eventId, 'calednar'+this.calendar)
  
  }
/*  getEventContent(info: EventContentArg): { html: string } {
    
    const eventId = info.event.extendedProps['id'];
    console.log('event content'+eventId)
    return {
      html: `
        <div class="event">
          <div class="time">${info.timeText}</div>
          <div class="title">${info.event.title}</div>
          <div class="buttons"> 
          <button class="delete-button buttonInEvent"  data-event-id="${eventId}"><i class="fa fa-times" aria-hidden="true"></i></button>
          <button class="edit-button buttonInEvent"  data-event-id="${eventId}"><i class="fa fa-pencil" aria-hidden="true"></i></button>
          </div>
          
        </div>
      `,
      
    };
  }*/
  ngAfterViewInit() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const eventId = target.dataset['event-id'];
        console.log('afterinit'+eventId)
        this.removeEvent(eventId!);
        
      });
    });
    this.calendar.render();
  
  }
  handleDateClick(info: DateClickArg) {
    
 
  }
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
    
  }
  addEvent(event: any) 
  {
    // Combine the date and time to create a new Date object with the correct start time
    const startTime = moment(event.start).format('YYYY-MM-DD') + 'T' + event.time + ':00';
    
    let tempEndTime = moment(event.start).format('YYYY-MM-DD') + 'T' + event.endTime + ':00';
 
  /*  if(!event.endTime){
      tempEndTime = moment(startTime).add(15, 'minutes').format();
      event.endTime  = tempEndTime
    }*/
   
    this.calendarOptions.events = this.events;
    this.calendar.addEvent({
      title: event.title,
      start: startTime,
      end: tempEndTime,
      
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: <b>${event.title}</b><br>Time: <b>${event.time}</b>  <b>${event.endTime}</b>`,
        id: `${this.eventIdCounter}`,
        
      }
    });
    console.log('from add event'+ event.id)
    /*const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const eventId = target.dataset['event-id'];
        this.removeEvent(eventId!);
      });
    });*/
    this.eventIdCounter++; 
    this.events.push(event); // <-- push the new event to the events array
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



