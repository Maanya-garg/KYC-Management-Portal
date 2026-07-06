import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KycService } from '../services/kyc.service';
@Component({
  selector: 'app-create-kyc',
  imports: [FormsModule],
  templateUrl: './create-kyc.html',
  styleUrl: './create-kyc.css',
})
export class CreateKyc {
  firstName = '';
  lastName = '';
  idNumber = '';
  identityProofs = [
    'PAN',
    'FORM60'
  ];
  indAddressProofs = [
    'Passport',
    'Voter ID',
    'Driving License',
    'Aadhaar Card Number',
    'NREGA Job Card',
    'National Population Register Letter'
  ];

  leAddressProofs = [
    'Registration Certificate',
    'Certificate of Incorporation/Formation',
    'GSTIN Certificate'
  ];

  othersInd = [
    'Photograph'
  ];

  othersLe: string[] = [];

  idNames: string[] = [];
  idType = '';
  clientType = 'IND';
  idName = '';
  prefix = '';

  middleName = '';

  gender = '';

  dateOfBirth = '';
  relationshipType = '';

relatedPersonPrefix= '';

  relatedPersonFirstName = '';

  relatedPersonMiddleName = '';

  relatedPersonLastName = '';

  mobileNumber = '';

  emailAddress = '';

  addressLine1 = '';

  city = '';

  district = '';

  state = '';

  country = '';

  pinCode = '';
  correspondenceAddressLine1 = '';

  correspondenceCity = '';

  correspondenceDistrict = '';

  correspondenceState = '';

  correspondenceCountry = '';

  correspondencePinCode = '';
  sameAsAddress = false;
  constructor(private kycService: KycService) {
  }
  onIdTypeChange() {

    if (this.idType === 'IDENTITY_PROOF') {

      this.idNames = this.identityProofs;

    }

    else if (this.idType === 'ADDRESS_PROOF') {

      if (this.clientType === 'IND') {
        this.idNames = this.indAddressProofs;
      }
      else {
        this.idNames = this.leAddressProofs;
      }

    }

    else if (this.idType === 'Others') {

      if (this.clientType === 'IND') {
        this.idNames = this.othersInd;
      }
      else {
        this.idNames = this.othersLe;
      }

    }

    else {

      this.idNames = [];

    }

    this.idName = '';
  }

  submitForm() {
    if(!this.idNumber){
      alert("ID Number is required");
      return;
    }
    if(!this.idType){
      alert("ID Type is required");
      return;
    }
    if(!this.idName){

      alert("ID Name is required");

      return;

    }
    if(!this.firstName){
      alert(
        this.clientType === 'LE'
          ? 'Corporate Name is required'
          : 'First Name is required'
      );
      return;
    }
    if (this.clientType === 'IND') {
    if(!this.lastName){
      alert("Lastname is required");
      return;
    }
    if(!this.gender){
      alert("Gender is required");
      return;
    }}
    if(!this.dateOfBirth){
      alert(
        this.clientType === 'LE'
          ? 'Date of incorporation is required'
          : 'Date of Birth is required'
      );
      return;
    }
    if(!this.mobileNumber || this.mobileNumber.length !== 10){
      alert("Mobile Number must be 10 digits");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(this.emailAddress)){
      alert("Please enter a valid email address (e.g. abc@gmail.com)");
      return;
    }
    if(!this.addressLine1){
      alert("Address Line 1 is required");
      return;
    }
    if(!this.city){
      alert("City is required");
      return;
    }
    if(!this.state){
      alert("State is required");
      return;
    }
    if(!this.country){
      alert("Country is required");
      return;
    }
    if(this.pinCode.length !== 6){
      alert("Pin Code must be 6 digits");
      return;
    }
    if (this.sameAsAddress) {
      this.copyAddress();
    }
    const data = {
      clientType: this.clientType,
      prefix: this.prefix,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      gender: this.gender,
      idName:this.idName,
      dateOfBirth: this.dateOfBirth,
      relationshipType: this.relationshipType,
      relatedPersonPrefix: this.relatedPersonPrefix,
      relatedPersonFirstName: this.relatedPersonFirstName,
      relatedPersonMiddleName: this.relatedPersonMiddleName,
      relatedPersonLastName: this.relatedPersonLastName,
      mobileNumber: this.mobileNumber,
      emailAddress: this.emailAddress,
      addressLine1: this.addressLine1,
      city: this.city,
      district: this.district,
      state: this.state,
      country: this.country,
      pinCode: this.pinCode,
      idType: this.idType,
      idNumber: this.idNumber,
      correspondenceAddressLine1:this.correspondenceAddressLine1,

      correspondenceCity:this.correspondenceCity,

      correspondenceDistrict:this.correspondenceDistrict,

      correspondenceState:this.correspondenceState,

      correspondenceCountry:this.correspondenceCountry,

      correspondencePinCode:this.correspondencePinCode,
    };

    this.kycService.createKyc(data).subscribe(response => {
      console.log(response);
      alert('KYC Created Successfully');
    });

  }
  copyAddress() {

    if(this.sameAsAddress){

      this.correspondenceAddressLine1 =
        this.addressLine1;

      this.correspondenceCity =
        this.city;

      this.correspondenceDistrict =
        this.district;

      this.correspondenceState =
        this.state;

      this.correspondenceCountry =
        this.country;

      this.correspondencePinCode =
        this.pinCode;

    } else {

      this.correspondenceAddressLine1 = '';
      this.correspondenceCity = '';
      this.correspondenceDistrict = '';
      this.correspondenceState = '';
      this.correspondenceCountry = '';
      this.correspondencePinCode = '';

    }

  }
  onAddressChange() {

    if (this.sameAsAddress) {
      this.copyAddress();
    }

  }
}
