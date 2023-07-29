import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  errorMessage: boolean = false;
  successMessage: boolean = false;
  loading: boolean = false;
  errorMessageStr: string = "";
  errorMessageHdr: string = "";
  checked:boolean=true;
  constructor(private router: Router, private fb: FormBuilder,
    private authenticationService: AuthService) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  /** New Backend Changes */
  user: any;
  createRegisterForm() {
    this.registerForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      type:new FormControl('', Validators.required),
    }, { validator: this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.user = this.registerForm.value;
      this.authenticationService.SignUp(this.user).then(
        response => {
          this.loading = false;
            this.successMessage = true;
            setTimeout(() => {
              this.successMessage = false;
              this.router.navigate(['login']);
            }, 2000);
          
        }
      ).catch(
        error => {
          this.loading = false;
          if (error && error.error && error.error.failure) {
            this.errorMessageStr = error.error.failure;
            this.errorMessageHdr = "Sorry. Error while creating your account.";
          } else {
            this.errorMessageStr = "Server Error. Please try again after some time.";
            this.errorMessageHdr = "Sorry for the inconvenience.";
          }
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 3000);
        }
      );
    }
  }

}
