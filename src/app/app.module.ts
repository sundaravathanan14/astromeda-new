import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './onboard/login/login.component';
import { RegisterComponent } from './onboard/register/register.component';
import { ForgetPasswordComponent } from './onboard/forget-password/forget-password.component';
import { DashboardComponent } from './landing-page/dashboard/dashboard.component';
import { UserListComponent } from './landing-page/user/user-list/user-list.component';
import { AddEditUserComponent } from './landing-page/user/add-edit-user/add-edit-user.component';
import { ContactComponent } from './support/contact/contact.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TestComponent } from './test/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideNavBarComponent } from './shared-component/side-nav-bar/side-nav-bar.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    UserListComponent,
    AddEditUserComponent,
    ContactComponent,
    TestComponent,
    SideNavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,NgChartsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
