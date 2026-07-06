import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KycService } from '../services/kyc.service';


@Component({
  selector: 'app-search-kyc',
  imports: [FormsModule],
  templateUrl: './search-kyc.html',
  styleUrl: './search-kyc.css',
})
export class SearchKyc {
  idType = '';
  idName = '';
  idNumber = '';
  clientType = 'IND';
  firstName = '';

  middleName = '';

  lastName = '';

  gender = '';

  dateOfBirth = '';
  result: any = null;
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
  constructor(private kycService: KycService) {}
  search() {

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
    const data = {
      idType: this.idType,
      idNumber: this.idNumber,
      idName: this.idName,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth
    };

    this.kycService.searchKyc(data).subscribe({

      next: (response: any) => {

        console.log(response);

        if (response == null) {
          alert("No KYC record found.");
          this.result = null;
          return;
        }

        this.result = response;

      },

      error: () => {

        alert("No KYC record found.");
        this.result = null;

      }

    });
  }

}

