export class UserModel{
    deviceId!: string;
    userName!: string;
    phoneNumber!: number;
    age!: number;
    alternatePhoneNumber!: number;
    sex!: string;
    bloodGroup!: string;
    weight!: number;
    profileImage!:string;
    createdBy!: string;
    createdDate!: Date;
    deletedFlag!: Boolean;
    id!: string;
    lastupdatedDate!: Date;
    updatedBy!: string;
    

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
  }