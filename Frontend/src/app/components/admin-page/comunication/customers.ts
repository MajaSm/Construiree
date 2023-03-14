import { Time } from "@angular/common";

export class Customers {
    [x: string]: any;
    name: string;
    surname: string;
    subject: string;
    ticket: string;
    email: string;
    phone: string
    message:any;
    requestedTime: string;
    id: string;
    dateForDelivery: string
    address:string;
    constructor(name: string, surname: string, email: string, phone: string, message:any,subject: string,ticket: string, requestedTime: string,id: string,dateForDelivery:string, address:string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.message = message
        this.subject = subject;
        this.ticket = ticket;
        this.requestedTime = requestedTime;
        this.id = id;
        this.dateForDelivery = dateForDelivery;
        this.address = address;
    }
  }