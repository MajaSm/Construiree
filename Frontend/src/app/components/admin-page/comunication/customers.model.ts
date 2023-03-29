import { Time } from "@angular/common";

export class Customers {
    [x: string]: any;
    name: string;
    wholeName:string;
    surname: string;
    subject: string;
    ticket: string;
    email: string;
    phone: string
    message:any;
    messageFromAdmin:any;
    requestedTime: string;
    id: string;
    dateForDelivery: string
    address:string;
    color: string;
    materials: string;
    count:string;
    
    constructor(name: string, surname: string,wholeName:string, email: string,color:string, phone: string, message:any,messageFromAdmin:any , subject: string,ticket: string, requestedTime: string,id: string,dateForDelivery:string, address:string, materials: string,count:string) {
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
        this.wholeName =wholeName;
        this.messageFromAdmin = messageFromAdmin;
     //   this.color = this.getRandomColor()
        this.color= color;
        this.materials = materials;
        this.count = count;
    }
   
  }