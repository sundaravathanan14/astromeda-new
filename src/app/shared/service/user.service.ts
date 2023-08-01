import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient,private db: AngularFireDatabase,private firestore: AngularFirestore,private sharedService:AuthService) { }
  type=this.sharedService.getLoggedInData().type == 'doctor' ? 'Patients': 'Worker';
  typeForLiveData = this.sharedService.getLoggedInData().type == 'doctor' ? 'Patient_Live_Data': 'Worker_Live_Data';
  baseUrl = environment.baseURL;
  /**
   * Get All Users
   */
  getAllUsers() {
      return this.firestore.collection(`/${this.type}`).valueChanges();
          
  }

  /**
   * Add Patients
   */
  addPatient(user: UserModel) {
      this.createData(user.deviceId);
      return this.firestore.collection(`/${this.type}/`).doc(user.deviceId).set({
                  deviceId:user.deviceId,
                  userName: user.userName,                  
                  phoneNumber: user.phoneNumber,
                  age: user.age,
                  alternatePhoneNumber: user.alternatePhoneNumber,
                  sex:user.sex,
                  bloodGroup: user.bloodGroup,
                  weight: user.weight,
                  profileImage: user.profileImage,
                  createdBy: user.createdBy,
                  createdDate: user.createdDate,
                  deletedFlag: user.deletedFlag,
                  id: user.id,
                  lastupdatedDate:user.lastupdatedDate,
                  updatedBy: user.updatedBy,
      })
  }

  /**
   * Get patient details by Id
   */
  patientDetail !: UserModel;

  getPatientById(id: string) {
      console.log(id);
   return this.firestore.doc(`/${this.type}/${id}`)
          .snapshotChanges();
  }

  /**
   * Update Patient
   */

  updatePatient(user:UserModel){
      return this.firestore.doc(`/${this.type}/${user.deviceId}`).update({
                  userName: user.userName,                  
                  phoneNumber: user.phoneNumber,
                  age: user.age,
                  alternatePhoneNumber: user.alternatePhoneNumber,
                  sex:user.sex,
                  bloodGroup: user.bloodGroup,
                  weight: user.weight,
                  profileImage: user.profileImage,
                  createdBy: user.createdBy,
                  createdDate: user.createdDate,
                  deletedFlag: user.deletedFlag,
                  id: user.id,
                  lastupdatedDate:user.lastupdatedDate,
                  updatedBy: user.updatedBy,
      })
  }
  /**
   * Delete Patient
   */
  deletePatient(id:string){
      return this.firestore.doc(`/${this.type}/${id}`).delete();
  }
  createData(data: any): Promise<void> {
      let liveData={
          bodyTemperature: 0,
          DIA:0,
          SYS:0,
          heartRate:0,
          SPO2:0,
          respirationRate:0,
          ECG:0,
          EMG:0,
          GSR:0,
      }
      // const id = this.db.createPushId(data); // Generate a unique document ID
      return this.db.object(`${this.typeForLiveData}/${data}`).set(liveData);
    }
    getData(id: string): Observable<any> {
      return this.db.object(`${this.typeForLiveData}/${id}`).valueChanges();
    }
  
    updateData(id: string, data: any): Promise<void> {
      return this.db.object(`${this.typeForLiveData}/${id}`).update(data);
    }
  
    deleteData(id: string): Promise<void> {
      return this.db.object(`${this.typeForLiveData}/${id}`).remove();
    }
    getProceesedData(){
      var bearerToken = sessionStorage.getItem('bearerToken');
    var authhdr = 'Bearer ' + bearerToken;
    // let reqHeader = new HttpHeaders({ 'Authorization': authhdr });
   return this.httpClient.get('https://astroprocessing.onrender.com/');
    }
}
