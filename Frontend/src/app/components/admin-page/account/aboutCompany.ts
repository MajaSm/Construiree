export class AboutCompany {
    name: string;
    surname: string;
    address: string;
    companyName:string;
    companyOIB: string;
    email: string;
    description: string;

    constructor(name: string, surname: string, address: string, companyName:string, companyOIB: string, email:string, description:string) {
        this.name = name;
        this.surname = surname;
        this.address = address;
        this.companyName = companyName;
        this.companyOIB = companyOIB;
        this.email = email;
        this.description = description;
    }
  }

 