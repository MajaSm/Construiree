export class Event {
    id: number;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    time: string;
    endTime:string
  
    constructor(id: number, title: string, start: Date, end: Date, allDay: boolean, time: string, endTime:string) {
      this.id = id;
      this.title = title;
      this.start = start;
      this.end = end;
      this.allDay = allDay;
      this.time = time;
      this.endTime = endTime;
    }
  }