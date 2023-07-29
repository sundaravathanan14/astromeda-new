import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {
  regiForm!: FormGroup
  user!: UserModel;
  myDate = new Date();
  idDevice: any;
  loading: boolean = false;
  success: boolean = false;
  errorPopup: boolean = false;
  editUser: boolean =false;
  type = '';

  constructor(private fb: FormBuilder,private sharedService: AuthService,
    private serviceUser: UserService,private storage:AngularFireStorage,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.type = this.sharedService.getLoggedInData()[0].type == 'doctor'? 'Patient': 'Worker';
    if (this.route.snapshot.queryParams['key']) {
      this.loading = true;
      this.route.queryParams.subscribe((params: any) => {

        this.idDevice = params['key'];
        this.editUser = this.idDevice ? true : false;
      })
    }
    
    this.userDetails();
  }
  userDetails() {
    this.loading = true;
    if (!this.idDevice) {
      // this.serviceUser.getAllUsers()
      //   .subscribe(data => {
      //     this.user = data as UserModel[];
          this.imgSrc = 'assets/assets/images/no-image.jpg';
          this.initalizeUser(null);
          this.loading = false;
        // }, error => {
        //   this.loading = false;
        // }
       // );
    }

    else {
      this.loading = true;
      this.serviceUser.getPatientById(this.idDevice)
        .subscribe((patient)=>{
    let obj: any = patient.payload.data();
    this.user = {
        deviceId: obj?.deviceId,
        userName: obj?.userName,                  
        phoneNumber: obj?.phoneNumber,
        age: obj?.age,
        alternatePhoneNumber: obj?.alternatePhoneNumber,
        sex: obj?.sex,
        bloodGroup: obj?.bloodGroup,
        weight: obj?.weight,
        profileImage: obj?.profileImage,
        createdBy: obj?.createdBy,
        createdDate: obj?.createdDate,
        deletedFlag: obj?.deletedFlag,
        id: obj?.id,
        lastupdatedDate:obj?.lastupdatedDate,
        updatedBy: obj?.updatedBy,
    }
    this.initalizeUser(this.user);
          this.selectedImage=this.user?.profileImage;
          this.imgSrc=this.user?.profileImage;
          this.loading = false;

        }, error => {
          this.loading = false;
        });
    }
  }
  
  initalizeUser(data: any) {

    this.regiForm = this.fb.group({
    deviceId: [data ? data.deviceId : null, Validators.required],
    userName: [data ? data.userName : null, Validators.required],
    phoneNumber: [data ? data.phoneNumber : null, Validators.required],
    age:[data ? data.age : null, Validators.required],
    alternatePhoneNumber: [data ? data.alternatePhoneNumber : null, Validators.required],
    sex: [data ? data.sex : null, Validators.required],
    bloodGroup: [data ? data.bloodGroup : null, Validators.required],
    weight: [data ? data.weight : null, Validators.required],
    profileImage:[data ? data.profileImage : null],
    createdBy:[data ? data.createdBy : null],
    createdDate: [data ? data.createdDate : this.myDate],
    deletedFlag: [data ? data.deletedFlag : false],
    id: [data ? data.id : null],
    lastupdatedDate:[this.myDate],
    updatedBy: [data ? data.updatedBy : null],

    });
  }
  onSubmit() {

    if (this.regiForm.valid) {
      if(this.selectedImage){
      var filePath = `PatientProfiles/${this.selectedImage.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
           // if(this.regiForm) this.regiForm['profileImage'] = url;
          })
        })
      )
      }
      if (!this.idDevice) {
        this.loading = true;
        this.serviceUser.addPatient(this.regiForm.value).then(
          (response: any) => {
            this.loading = false;
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.router.navigate(['/user-list']);
            }, 2000);


          }, (error: any) => {
            this.loading = false;
            this.errorPopup = true;
            setTimeout(() => {
              this.errorPopup = false;
            }, 2000);

          }
        )

      }
      else {
        this.loading = true;
        this.serviceUser.updatePatient(this.regiForm.value).then(
          response => {
            this.loading = false;
            this.success = true;
            setTimeout(() => {

              this.success = false;
              this.router.navigate(['/user-list']);
            }, 2000);


          }, error => {
            this.loading = false;
            this.errorPopup = true;
            setTimeout(() => {
              this.errorPopup = false;

            }, 2000);

          }

        )
      }
    }
  }
  cancel() {
    this.loading = true;
    this.router.navigate(['/user-list']);
  }
  imgSrc!: string;
  selectedImage: any = null;
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imgSrc = e.target.result;
        reader.readAsDataURL(event.target.files[0]);
        this.selectedImage = event.target.files[0];
    }
    else {
        this.imgSrc = 'src\assets\assets\images\no-image.jpg';
        this.selectedImage = null;
    }
}
 

}
