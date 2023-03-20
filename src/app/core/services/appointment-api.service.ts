import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentCreation } from '../model/creation/appointment/AppointmentCreation';

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/appointment";
  }

  completeAppointment(id: number) {
    return this.http.put(this.baseUrl + "/complete/" + id, {});
  }

  cancelAppointment(id: number) {
    return this.http.put(this.baseUrl + "/cancel/" + id, {});
  }

  addApointment(cleaningServiceId: number, employeeId: number, appointmentCreation: AppointmentCreation) {
    return this.http.put(this.baseUrl + "/add/" + cleaningServiceId + "/" + employeeId, appointmentCreation);
  }
}
