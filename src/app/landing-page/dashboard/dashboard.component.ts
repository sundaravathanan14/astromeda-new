import { Component } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  user!:UserModel;
  ecgChartData: any[] = [
    { data: [], label: 'ECG Waveform' }
  ];
  emgChartData: any[] = [
    { data: [], label: 'EMG Waveform' }
  ];
  gsrChartData: any[] = [
    { data: [], label: 'GSR Waveform' }
  ];

  ecgChartLabels: any[] = [];
  emgChartLabels: any[] = [];
  gsrChartLabels: any[] = [];

  lineChartOptions: any = {
    responsive: true
  };

  lineChartLegend = true;
  lineChartType = 'line';
  livedata: any;

  ecg = false;
  emg = false;
  gsr = false;
  constructor(private sharedService: AuthService,private crduService:UserService) { }
  ngOnInit(): void {
    
    this.generateRandomData();
    
}
search(event:any){
  this.getBasicDetail(event.target.value);
  this.getLiveData(event.target.value);
  
}
getBasicDetail(data:any){
  this.crduService.getPatientById(data).subscribe((data)=>{
    let obj: any = data.payload.data();
    console.log(obj);
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
  })
}
getLiveData(data:any){
  this.crduService.getData(data).subscribe((data)=>{
    console.log(data);
    this.livedata = data;
    const time = new Date().toLocaleTimeString();
    this.ecgChartData[0].data.push(this.livedata.ECG);
    this.ecgChartLabels.push(time);

    this.emgChartData[0].data.push(this.livedata.EMG);
    this.emgChartLabels.push(time);

    this.gsrChartData[0].data.push(this.livedata.GSR);
    this.gsrChartLabels.push(time);

    // Update the chart by triggering change detection
    this.ecgChartData = [...this.ecgChartData];
    this.ecgChartLabels = [...this.ecgChartLabels];
    this.emgChartData = [...this.emgChartData];
    this.emgChartLabels = [...this.emgChartLabels];
    this.gsrChartData = [...this.gsrChartData];
    this.gsrChartLabels = [...this.gsrChartLabels];
    
  })
  // this.crduService.getProceesedData().subscribe((data)=>{
  //   console.log(data,'process data');
  // })
}

generateRandomData() {
  setInterval(() => {
    const randomValue = Math.floor(Math.random() * 100);
    const time = new Date().toLocaleTimeString();

    // this.lineChartData[0].data.push(randomValue);
    // this.lineChartLabels.push(time);

    // // Update the chart by triggering change detection
    // this.lineChartData = [...this.lineChartData];
    // this.lineChartLabels = [...this.lineChartLabels];
  }, 0);
}

// enteredUser(userData: UserDetails){
//     this.sharedService.setUserData(userData);
//     if (
//       userData.profile_image &&
//       userData.profile_image.length > 0
//     ) {
//       this.userService
//         .getPhotos(userData.profile_image)
//         .then((url) => (this.profileUrl = url))
//         .catch((err) => {
//           console.log("getPhotos Error: " + err.message);
//         });
//     } else {
//       this.profileUrl = '';
//     }
// }
changeChart(chart:string){
  this.ecg = chart == 'ecg' ? true: false;
  this.emg = chart == 'emg' ? true: false;
  this.gsr = chart == 'gsr' ? true: false;
}
    

}
