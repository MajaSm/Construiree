interface Event {
    
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    time: string;
    endTime:string
    extendedProps: {
      tooltipContent: string;
      id: string;
    }
  /*  constructor(id: number, title: string, start: Date, end: Date, allDay: boolean, time: string, endTime:string) {
      this.id = id;
      this.title = title;
      this.start = start;
      this.end = end;
      this.allDay = allDay;
      this.time = time;
      this.endTime = endTime;
    }*/
    events: Event [];
  }