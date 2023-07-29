import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './landing-page/dashboard/dashboard.component';
import { AddEditUserComponent } from './landing-page/user/add-edit-user/add-edit-user.component';
import { UserListComponent } from './landing-page/user/user-list/user-list.component';
import { ForgetPasswordComponent } from './onboard/forget-password/forget-password.component';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { ContactComponent } from './support/contact/contact.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  //login start
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'forgot-password', component: ForgetPasswordComponent },
  //login end
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-edit', component: AddEditUserComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: '**',
    redirectTo: 'login'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
