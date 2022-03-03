import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmergencyContactInformationDto } from '../dto/EmergencyContactInformationDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/employee/";
  }

  modifyEmergencyContactInfo(userId: number, dto: EmergencyContactInformationDto) {
    return this.http.post(this.baseUrl + "emergency-contact-info/" + userId, dto);
  }
}
