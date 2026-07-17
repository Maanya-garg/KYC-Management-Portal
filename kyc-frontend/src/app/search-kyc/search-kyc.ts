import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KycService } from '../services/kyc.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-search-kyc',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
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

  kycRecords: any[] = [];
  loading = false;
  searchAttempted = false;

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

  constructor(
    private kycService: KycService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  showError(message: string) {
    this.snackBar.open(message, 'Close', { duration: 4000, panelClass: 'error-snackbar' });
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

  search() {
    this.searchAttempted = true;

    // Strict validation as requested
    if (!this.idNumber) {
      this.showError('ID Number is required');
      return;
    }
    if (!this.idType) {
      this.showError('ID Type is required');
      return;
    }
    if (!this.idName) {
      this.showError('ID Name is required');
      return;
    }
    if (!this.firstName) {
      this.showError(this.clientType === 'LE' ? 'Corporate Name is required' : 'First Name is required');
      return;
    }
    if (this.clientType === 'IND') {
      if (!this.lastName) {
        this.showError('Last Name is required');
        return;
      }
      if (!this.gender) {
        this.showError('Gender is required');
        return;
      }
    }
    if (!this.dateOfBirth) {
      this.showError(this.clientType === 'LE' ? 'Date of incorporation is required' : 'Date of Birth is required');
      return;
    }

    this.loading = true;

    const data = {
      idType: this.idType,
      idNumber: this.idNumber,
      idName: this.idName,
      firstName: this.firstName,
      middleName: this.middleName || null,
      lastName: this.lastName || null,
      gender: this.gender || null,
      dateOfBirth: this.formatDate(this.dateOfBirth)
    };

    this.kycService.searchKyc(data).subscribe({
      next: (response: any) => {
        this.loading = false;
        console.log(response);
        if (response == null) {
          this.showError("No KYC record found matching these details.");
          this.kycRecords = [];
          this.cdr.detectChanges();
          return;
        }
        this.kycRecords = [response];
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.showError("An error occurred while searching. Please try again.");
        this.kycRecords = [];
        this.cdr.detectChanges();
      }
    });
  }
}
