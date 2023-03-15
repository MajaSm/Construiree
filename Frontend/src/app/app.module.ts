import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { NgToastModule } from 'ng-angular-popup';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/admin-page/body/body.component';
import { StatisticsComponent } from './components/admin-page/statistics/statistics.component';
import { TasksComponent } from './components/admin-page/tasks/tasks.component';
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
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    StatisticsComponent,
    TasksComponent,
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
    
   
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    AutosizeModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
