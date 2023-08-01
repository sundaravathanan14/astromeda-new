import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';import { Observable } from 'rxjs';
import { LoginUser } from '../interfaces/user.interface';
''

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in sessionStorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.userData = user;
    //     sessionStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(sessionStorage.getItem('user')!);
    //   } else {
    //     sessionStorage.setItem('user', 'null');
    //     JSON.parse(sessionStorage.getItem('user')!);
    //   }
    // });
  }
  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password);
  }
  setAccessToken(token:string) {
    sessionStorage.setItem('bearerToken', token);
}
  // Sign up with email/password
  SignUp(user:any) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        console.log('comes',result);
        this.SendVerificationMail();
        this.SetUserData(result.user,user);
      })
      .catch((error) => {
        console.log('comes')
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.afAuth.currentUser.then((user) => {
      if (user) {
        user.sendEmailVerification()
          .then(() => {
            // Handle successful email verification email sent
            console.log('Email verification email sent');
          })
          .catch((error) => {
            // Handle email verification email sending error
            console.error('Email verification email error', error);
          });
      }
    });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    return user !== null ? true : false;
  }
  setLoggedInData(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
}
  getLoggedInData(){
    return JSON.parse(sessionStorage.getItem('user') || ''); 
  }
  getUser(email: string): Observable<any> {
    try {
      return this.afs
        .collection<any>('Register-user', (ref) =>
          ref.where('email', '==', email).limit(1)
        )
        .valueChanges();
    } catch (error: any) {
      // TODO: handle error messages
      return error.message;
    }
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any,enteredDetails:any) {
    return this.afs.collection(`/Register-user/`).doc(user.uid).set({
      userName:enteredDetails.userName,
      email:enteredDetails.email,
      type:enteredDetails.type,
      id:user.uid,
})
  }
  // Sign out
  signOut() {
      this.afAuth.signOut();
      sessionStorage.removeItem('user');
      return this.router.navigate(['login']);
    
  }
}
