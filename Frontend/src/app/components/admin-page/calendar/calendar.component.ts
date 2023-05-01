import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CalendarOptions,EventInput, Calendar, EventApi, EventContentArg  } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listWeek from '@fullcalendar/list';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { AddEventDialogComponent } from 'src/app/components/admin-page/add-event-dialog/add-event-dialog.component';
import { DialogDeleteConfirmationComponent } from '../dialog-delete-confirmation/dialog-delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { MatTooltip } from '@angular/material/tooltip';
import { Tooltip } from 'bootstrap';
import tippy, {animateFill} from 'tippy.js';
import { auto, end, start } from '@popperjs/core';
import hrLocale from '@fullcalendar/core/locales/hr';
import { BehaviorSubject, Observable } from 'rxjs';
import { data } from 'jquery';
import { CUSTOMERS } from 'src/app/components/admin-page/comunication/customer.data';
import { Router } from '@angular/router';
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
   /* {
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
      id:'1',
      time:'12:00',
      allDay: false ,
      extendedProps: {
        tooltipContent: `Title: sadaaaaaaaafdssssssssss sssssssss aaaaaaaaaaaaad <br> sdadasdas`,
       
      },
      
    },
   
    {
      title: 'cccc',
      start: '2023-04-05T11:00:00',
      end: '',
      allDay: false ,
      id:'2',
      extendedProps: {
        tooltipContent: `Title: sadaaaaaaaafdssssshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhssssaaaaaaaaaaaaad <br> sdadasdas`,
       
      },
      
    },*/
    
  ];
  eventIdCounter = CUSTOMERS.length;
  constructor(private dialog: MatDialog,private router: Router) { }
  ngOnInit(): void {
    // initialize the calendar instance
    const calendarEl = document.getElementById('calendar');
    this.calendar = new Calendar(calendarEl!, this.calendarOptions);
    this.calendar.render();
   
    document.addEventListener('click', (event) => {
      // check if the clicked element is a delete button inside a Tippy
      const deleteButton = event.target as HTMLElement;
      const editButton = event.target as HTMLElement;
      const chatButton = event.target as HTMLElement;
      if (deleteButton.classList.contains('delete-button') && deleteButton.closest('.tippy-content')) {
        // get the ID of the event from the button's data-event-id attribute
        const eventId = deleteButton.getAttribute('data-event-id')!;
        // call the removeEventById method with the ID of the event to be removed
        console.log('eventId from addeventListener ' + eventId)
        this.removeEvent(eventId);
      }
      if (editButton.classList.contains('edit-button') && editButton.closest('.tippy-content')) {
        // get the ID of the event from the button's data-event-id attribute
        const eventId = editButton.getAttribute('data-event-id')!;
        // open the dialog and pass the event data as a parameter
        this.openDialogForEdit(eventId);
      }
      if (chatButton.classList.contains('chat-button') && chatButton.closest('.tippy-content')) {
        // get the ID of the event from the button's data-event-id attribute
        const eventId = chatButton.getAttribute('data-event-id')!;
        this.openChat(eventId)
      
      }
    });
    CUSTOMERS.forEach(customer => {
      const start = moment(customer.dateForDelivery, 'DD.MM.YYYY').format('YYYY-MM-DD') + 'T' + customer.time + ':00';
    
      this.calendar.addEvent({
        title:customer.name,
        start: start,
        time:customer.time,
        id:customer.id,
        extendedProps: {
          name: customer.name,
          surname: customer.surname,
          address: customer.address,
          material: customer.materials,
          count: customer.count,
          tooltipContent: `Ime: <b>${customer.name} ${customer.surname}</b>
                          <br>
                          Adresa: <b>${customer.address}</b>
                          <br>
                          Materijal: <b>${customer.materials}</b>
                          <br>
                          Kolicina: <b>${customer.count}</b>`,
          // Add any other extended props you want here
        }
        // Other event properties go here
      });
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
        text: 'Dodaj narudžbu',
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
        const eventId = info.event['id'];
        const tippyInstance = tippy(info.el, {
        placement: 'top',
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
            <div class='buttonsInTooltip buttons'>
            <button class="chat-button buttonInEvent" data-event-id=${eventId}><i class="fa fa-comments" aria-hidden="true"></i></button>
            <div class="buttons">
            <button class="delete-button buttonInEvent" data-event-id=${eventId}><i class="fa fa-times" aria-hidden="true"></i></button>
            <button class="edit-button buttonInEvent" data-event-id=${eventId}><i class="fa fa-pencil" aria-hidden="true"></i></button>
            
          </div>
            </div>
            `,
      });
    },
    eventContent: function(info: EventContentArg) {
      return {
        html: `   <div class="event">
          <div class="time">${info.timeText}</div>
          <div class="title">${info.event.extendedProps['name']} ${info.event.extendedProps['surname']}</div>
        </div>`,
      };
    },
  };

  openChat(ID:string){
    this.router.navigate(['/chat', ID]);
  }
   
  removeEventAfterEditing(eventId: string) {
    const eventApi = this.calendar.getEventById(eventId);
  
  // only remove event if delete confirmed
        if (eventApi) {
          eventApi.remove();
          console.log('removed')
        }
        this.calendar.render();
      
  }
  removeEvent(eventId: string){
    const eventApi = this.calendar.getEventById(eventId);
    let deleteConfirmed = false; // add flag to keep track of delete confirmation
  
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {
      width: '400px',
      data: {eventApi}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (deleteConfirmed) { // only remove event if delete confirmed
        if (eventApi) {
          eventApi.remove();
          console.log('removed')
        }
        this.calendar.render();
      }
    });
  
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      this.calendar.render();
    });
  
    dialogRef.componentInstance.confirmDelete.subscribe(() => {
      deleteConfirmed = true; // set flag to true when delete is confirmed
      dialogRef.close();
    });
  }
  ngAfterViewInit() {
    /*const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const eventId = target.dataset['data-event-id'];
        console.log('afterinit'+eventId)
        this.removeEvent(eventId!);
        
      });
    });
    this.calendar.render();
  */
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
      title: event.name,
   
      start: startTime,
      end: tempEndTime,
      id: `${this.eventIdCounter}`,
      allDay: false ,
      time: event.time,
      extendedProps: {
        name: event.name,
        surname: event.surname,
        address: event.address,
        material: event.material,
        count: event.count,
        tooltipContent: `Ime: <b>${event.name} ${event.surname}</b>
                        <br>
                        Adresa: <b>${event.address}</b>
                        <br>
                        Materijal: <b>${event.material}</b>
                        <br>
                        Kolicina: <b>${event.count}</b>`  ,
       
      }
    });
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
 
  openDialogForEdit(eventId: string): void {
    // get the event data from the calendar using the event ID
    const eventApi = this.calendar.getEventById(eventId);
    const eventData = eventApi!.toPlainObject();
    console.log(eventId)
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      width: '400px', // Set the dialog width
      data: { eventData } // Pass the event data to the dialog
    });

    this.calendar.render(); 

    dialogRef.componentInstance.closeDialog.subscribe(() => {
      this.calendar.render(); // Call your method to refresh the calendar data here
    });

    dialogRef.componentInstance.addEvent.subscribe((eventData: any) => {
      this.removeEventAfterEditing(eventId)
      this.addEvent(eventData);
    });
  }
}



