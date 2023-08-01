import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorPopup: boolean = false;
  loading: boolean = false;
  constructor(private authenticationService: AuthService,
    private router: Router) { }
     /** New Backend Changes */
  user: any;
  userName: string='';
  userPassword: string='';
  errorMessage: string='';

  login() {
    if (this.userName && this.userPassword && (this.userName != '' && this.userPassword != '')) {
      this.loading = true;
      this.authenticationService.SignIn(this.userName, this.userPassword).then(
        (response:any) => {
          this.authenticationService.setAccessToken(response['accessToken']);
          this.authenticationService.getUser(this.userName).subscribe((response)=>{
            {
              this.loading = false;
              this.user = response;
             
              this.authenticationService.setLoggedInData(this.user);
                this.router.navigate(['/dashboard']);
              }
          }, error => {
            this.loading = false;
            this.errorMessage = 'something went wrong';
            this.errorPopup = true;
            setTimeout(() => {
              this.errorPopup = false;

            }, 2000);
          })
        }
      ).catch(
        error => {
          this.loading = false;
          this.errorMessage = 'User is not found or wrong password';
          this.errorPopup = true;
          setTimeout(() => {
            this.errorPopup = false;
          }, 2000);
        }
      );
    }
  }
  /** New Backend Changes */
}
