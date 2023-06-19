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

  rescheduleAppointment(id: number, cleaningServiceId: number, appointmentCreation: AppointmentCreation) {
    return this.http.put(this.baseUrl + "/reschedule/" + id + "/" + cleaningServiceId, appointmentCreation);
  }
}
