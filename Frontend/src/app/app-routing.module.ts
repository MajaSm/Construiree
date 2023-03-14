import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/admin-page/dashboard/dashboard.component';
import { SettingsComponent } from './components/admin-page/settings/settings.component';
import { StatisticsComponent } from './components/admin-page/statistics/statistics.component';
import { TasksComponent } from './components/admin-page/tasks/tasks.component';
import { UserInfoComponent } from './components/admin-page/account/user-info.component';
import { ChatComponent } from './components/admin-page/comunication/chat/chat.component';
import { CustomersComponent } from './components/admin-page/comunication/customers/customers.component';
import { MessageComponent } from './components/admin-page/comunication/message/message.component';
const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'statistics', component: StatisticsComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'account', component: UserInfoComponent},
  {path: 'chat', component: ChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
