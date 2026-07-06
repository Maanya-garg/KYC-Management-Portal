import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KycService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createKyc(data: any) {
    return this.http.post(`${this.apiUrl}/create`, data);
  }
  searchKyc(data: any) {
    return this.http.post(
      'http://localhost:8080/search',
      data
    );
  }
  updateKyc(idNumber: string, data: any) {
    return this.http.put(
      `${this.apiUrl}/update/${idNumber}`,
      data
    );
  }
  getKycById(idNumber: string) {

    return this.http.get(
      `${this.apiUrl}/search/${idNumber}`
    );

  }
}
