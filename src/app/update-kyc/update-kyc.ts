import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KycService } from '../services/kyc.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-kyc',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
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

  // Wizard state
  currentStep = 1;
  loading = false;
  submissionSuccess = false;

  step1Submitted = false;
  step2Submitted = false;
  step3Submitted = false;
  step4Submitted = false;

  constructor(
    private kycService: KycService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 4000, panelClass: 'error-snackbar' });
  }

  scrollToFirstInvalidControl() {
    setTimeout(() => {
      const firstInvalidControl = document.querySelector('.ng-invalid');
      if (firstInvalidControl) {
        firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (firstInvalidControl as HTMLElement).focus();
      }
    }, 100);
  }

  validateStep1(): boolean {
    this.step1Submitted = true;
    if (!this.clientType || !this.idType || !this.idName) {
      this.showError('Please complete all mandatory fields in this section before continuing.');
      this.scrollToFirstInvalidControl();
      return false;
    }
    return true;
  }

  validateStep2(): boolean {
    this.step2Submitted = true;
    if (!this.firstName || !this.dateOfBirth) {
      this.showError('Please complete all mandatory fields in this section before continuing.');
      this.scrollToFirstInvalidControl();
      return false;
    }
    if (this.clientType === 'IND') {
      if (!this.lastName || !this.gender) {
        this.showError('Please complete all mandatory fields in this section before continuing.');
        this.scrollToFirstInvalidControl();
        return false;
      }
    }
    return true;
  }

  validateStep3(): boolean {
    this.step3Submitted = true;
    if (!this.mobileNumber || this.mobileNumber.length !== 10) {
      this.showError('Please complete all mandatory fields in this section before continuing.');
      this.scrollToFirstInvalidControl();
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.emailAddress || !emailRegex.test(this.emailAddress)) {
      this.showError('Please complete all mandatory fields in this section before continuing.');
      this.scrollToFirstInvalidControl();
      return false;
    }
    return true;
  }

  validateStep4(): boolean {
    this.step4Submitted = true;
    if (!this.addressLine1 || !this.city || !this.state || !this.country || !this.pinCode || this.pinCode.length !== 6) {
      this.showError('Please complete all mandatory fields in this section before continuing.');
      this.scrollToFirstInvalidControl();
      return false;
    }
    return true;
  }

  nextStep() {
    if (this.currentStep === 1 && !this.validateStep1()) return;
    if (this.currentStep === 2 && !this.validateStep2()) return;
    if (this.currentStep === 3 && !this.validateStep3()) return;
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onIdTypeChange() {
    if (this.idType === 'IDENTITY_PROOF') {
      this.idNames = this.identityProofs;
    } else if (this.idType === 'ADDRESS_PROOF') {
      if (this.clientType === 'IND') {
        this.idNames = this.indAddressProofs;
      } else {
        this.idNames = this.leAddressProofs;
      }
    } else if (this.idType === 'Others') {
      if (this.clientType === 'IND') {
        this.idNames = this.othersInd;
      } else {
        this.idNames = this.othersLe;
      }
    } else {
      this.idNames = [];
    }
    this.idName = '';
  }

  loadRecord() {
    if (!this.idNumber) {
      this.showError('Please enter an ID Number to load.');
      return;
    }

    this.loading = true;
    this.kycService.getKycById(this.idNumber).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (!response) {
          this.showError("No KYC record found.");
          this.recordLoaded = false;
          this.resetForm();
          this.cdr.detectChanges();
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
        this.currentStep = 1;
        this.step1Submitted = false;
        this.step2Submitted = false;
        this.step3Submitted = false;
        this.step4Submitted = false;
        this.submissionSuccess = false;

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
        this.loading = false;
        this.showError("No KYC record found.");
        this.recordLoaded = false;
        this.resetForm();
      }
    });
  }

  private formatDate(date: any): string | null {
    if (!date) return null;
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return date;
    }
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  update() {
    if (!this.validateStep4()) return;

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
      dateOfBirth: this.formatDate(this.dateOfBirth),
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

    this.loading = true;
    this.kycService.updateKyc(this.idNumber, data).subscribe({
      next: (response) => {
        console.log(response);
        this.loading = false;
        this.submissionSuccess = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.showError('Failed to update KYC record. Please try again.');
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  copyAddress() {
    if (this.sameAsAddress) {
      this.correspondenceAddressLine1 = this.addressLine1;
      this.correspondenceCity = this.city;
      this.correspondenceDistrict = this.district;
      this.correspondenceState = this.state;
      this.correspondenceCountry = this.country;
      this.correspondencePinCode = this.pinCode;
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
    this.recordLoaded = false;
    this.currentStep = 1;
    this.submissionSuccess = false;
    this.step1Submitted = false;
    this.step2Submitted = false;
    this.step3Submitted = false;
    this.step4Submitted = false;
    
    this.idNumber = '';
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
