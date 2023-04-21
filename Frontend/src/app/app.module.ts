import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
//import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/admin-page/body/body.component';
import { StatisticsComponent } from './components/admin-page/statistics/statistics.component';
import { SettingsComponent } from './components/admin-page/settings/settings.component';
import { DashboardComponent } from './components/admin-page/dashboard/dashboard.component';
import { NavigationComponent } from './components/admin-page/navigation/navigation.component';
import { UserInfoComponent } from './components/admin-page/account/user-info.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphComponent } from './components/admin-page/graph/graph.component';
import { MapComponent } from './components/admin-page/map/map.component';
import { CustomersComponent } from './components/admin-page/comunication/customers/customers.component';
import { AboutCustomersComponent } from './components/admin-page/comunication/about-customers/about-customers.component';
import { MessageComponent } from './components/admin-page/comunication/message/message.component';
import { ChatComponent } from './components/admin-page/comunication/chat/chat.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './components/admin-page/comunication/filters/filters.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AutosizeModule } from 'ngx-autosize';


import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/admin-page/calendar/calendar.component';
import { AddEventDialogComponent } from './components/admin-page/add-event-dialog/add-event-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerIntl, MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatTimepickerModule, } from 'ngx-mat-timepicker';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTooltipModule} from '@angular/material/tooltip';
import { registerLocaleData } from '@angular/common';
import localeHr from '@angular/common/locales/hr';
import { CustomDateAdapter } from './components/admin-page/custom-date-adapter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
registerLocaleData(localeHr);
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    StatisticsComponent,
    SettingsComponent,
    DashboardComponent,
    NavigationComponent,
    UserInfoComponent,
    GraphComponent,
    MapComponent,
    CustomersComponent,
    AboutCustomersComponent,
    MessageComponent,
    ChatComponent,
    FiltersComponent,
    CalendarComponent,
    AddEventDialogComponent,
    
    
   
  ],
  imports: [

    BrowserModule,
    
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule, 
    AutosizeModule,
    CommonModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FullCalendarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMatTimepickerModule,
    NgbTimepickerModule,
    MatTooltipModule,
    
    
    
   
  
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hr' },{ provide: DateAdapter, useClass: CustomDateAdapter } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
