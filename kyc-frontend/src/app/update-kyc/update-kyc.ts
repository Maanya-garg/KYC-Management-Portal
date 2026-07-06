import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KycService } from '../services/kyc.service';
@Component({
  selector: 'app-update-kyc',
  imports: [FormsModule],
  templateUrl: './update-kyc.html',
  styleUrl: './update-kyc.css',

})
export class UpdateKyc {
  firstName = '';
  lastName = '';
  idNumber = '';
  idType = '';
  idName = '';
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
  clientType = 'IND';
  recordLoaded = false;
  prefix = '';

  middleName = '';

  gender = '';

  dateOfBirth = '';
  relationshipType = '';

  relatedPersonPrefix = '';

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
  loadRecord() {

    this.kycService.getKycById(this.idNumber).subscribe({

      next: (response: any) => {

        console.log(response);
        if (response == null) {
          alert("No KYC record found.");
          this.recordLoaded = false;
          this.resetForm();
          return;
        }
        this.clientType = response.clientType;
        this.prefix = response.prefix;
        this.firstName = response.firstName;
        this.middleName = response.middleName;
        this.lastName = response.lastName;
        this.idName = response.idName;
        this.gender = response.gender;
        this.dateOfBirth = response.dateOfBirth;
        this.relationshipType = response.relationshipType;
        this.relatedPersonPrefix = response.relatedPersonPrefix;
        this.relatedPersonFirstName = response.relatedPersonFirstName;
        this.relatedPersonMiddleName = response.relatedPersonMiddleName;
        this.relatedPersonLastName = response.relatedPersonLastName;
        this.mobileNumber = response.mobileNumber;
        this.emailAddress = response.emailAddress;
        this.addressLine1 = response.addressLine1;
        this.city = response.city;
        this.district = response.district;
        this.state = response.state;
        this.country = response.country;
        this.pinCode = response.pinCode;
        this.idType = response.idType;
        this.onIdTypeChange();
        this.idName = response.idName;
        this.idNumber = response.idNumber;
        this.correspondenceAddressLine1 = response.correspondenceAddressLine1;
        this.correspondenceCity = response.correspondenceCity;
        this.correspondenceDistrict = response.correspondenceDistrict;
        this.correspondenceState = response.correspondenceState;
        this.correspondenceCountry = response.correspondenceCountry;
        this.correspondencePinCode = response.correspondencePinCode;
        this.recordLoaded = true;
        if (
          this.addressLine1 === this.correspondenceAddressLine1 &&
          this.city === this.correspondenceCity &&
          this.district === this.correspondenceDistrict &&
          this.state === this.correspondenceState &&
          this.country === this.correspondenceCountry &&
          this.pinCode === this.correspondencePinCode
        ) {
          this.sameAsAddress = true;
        } else {
          this.sameAsAddress = false;
        }
      },

      error: () => {

        alert("No KYC record found.");

        this.recordLoaded = false;
        this.resetForm();
      }

    });

  }

  update() {
    if (!this.idNumber) {
      alert("ID Number is required");
      return;
    }
    if (!this.idType) {
      alert("ID Type is required");
      return;
    }
    if(!this.idName){

      alert("ID Name is required");

      return;

    }
    if (!this.firstName) {
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
    if (!this.mobileNumber || this.mobileNumber.length !== 10) {
      alert("Mobile Number must be 10 digits");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.emailAddress)) {
      alert("Please enter a valid email address (e.g. abc@gmail.com)");
      return;
    }
    if (!this.addressLine1) {
      alert("Address Line 1 is required");
      return;
    }
    if (!this.city) {
      alert("City is required");
      return;
    }
    if (!this.state) {
      alert("State is required");
      return;
    }
    if (!this.country) {
      alert("Country is required");
      return;
    }
    if (this.pinCode.length !== 6) {
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
      idName: this.idName,
      idNumber: this.idNumber,
      correspondenceAddressLine1: this.correspondenceAddressLine1,

      correspondenceCity: this.correspondenceCity,

      correspondenceDistrict: this.correspondenceDistrict,

      correspondenceState: this.correspondenceState,

      correspondenceCountry: this.correspondenceCountry,

      correspondencePinCode: this.correspondencePinCode
    };

    this.kycService.updateKyc(
      this.idNumber,
      data
    ).subscribe(response => {

      console.log(response);

      alert('KYC Updated Successfully');

    });

  }

  copyAddress() {

    if (this.sameAsAddress) {

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

  resetForm() {

    this.clientType = "IND";
    this.prefix = "";
    this.firstName = "";
    this.middleName = "";
    this.lastName = "";
    this.gender = "";
    this.dateOfBirth = "";
    this.relationshipType = "";
    this.relatedPersonPrefix = "";
    this.relatedPersonFirstName = "";
    this.relatedPersonMiddleName = "";
    this.relatedPersonLastName = "";
    this.mobileNumber = "";
    this.emailAddress = "";
    this.addressLine1 = "";
    this.city = "";
    this.district = "";
    this.state = "";
    this.country = "";
    this.pinCode = "";
    this.idType = "";
    this.correspondenceAddressLine1 = "";
    this.correspondenceCity = "";
    this.correspondenceDistrict = "";
    this.correspondenceState = "";
    this.correspondenceCountry = "";
    this.correspondencePinCode = "";
    this.sameAsAddress = false;
  }
  onAddressChange() {

    if (this.sameAsAddress) {
      this.copyAddress();
    }

  }

}
