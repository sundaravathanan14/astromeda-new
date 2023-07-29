import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {
  loggedUser:any;
  typeOfUserToAdd: string='';
  constructor(private loggedUserDetails:AuthService){}
  ngOnInit(): void {
    this.loggedUser=this.loggedUserDetails.getLoggedInData()[0];
    this.typeOfUserToAdd= this.loggedUser?.type == 'doctor' ? 'Patient': 'Worker';
  }
}
