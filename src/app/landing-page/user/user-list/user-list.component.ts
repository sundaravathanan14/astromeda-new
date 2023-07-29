import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  
  allPatients: any;
  patientsFilter: string='';
  loading: boolean = false;
  successDelete: boolean = false;
  type = '';
  

  constructor(private userService: UserService, private router: Router, private sharedService:AuthService
    ) { }

  ngOnInit() {
      this.type = this.sharedService.getLoggedInData()[0].type == 'doctor'? 'Patient': 'Worker';
      this.getUserlist();
     
  }
  getUserlist() {
    this.loading = true;
    this.userService.getAllUsers().subscribe((response:any) => {
      this.allPatients = response;
      this.loading = false;
    }, error => {
      this.loading = false;
    });

  }
  addPatientsPage() {
    // let student:Student ={
    //   $key : 'test',
    //   firstName: 'kaveri',
    // lastName: 'sd',
    // email: 'ds',
    // mobileNumber: 12,
    // }
    
    this.loading = true;
    this.router.navigate(['/add-edit']);
  }

  delete(patient:UserModel) {
    this.loading = true;
    this.userService.deletePatient(patient.deviceId)
      .then(() => {
        this.loading = false;
        this.successDelete = true;
        setTimeout(() => {
          this.successDelete = false;
        }, 2000);
        this.getUserlist();
      });

  }
}
