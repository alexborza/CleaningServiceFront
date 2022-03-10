import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvailableInterval } from '../dto/AvailableInterval';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';
import { EmployeesDayAgenda } from '../dto/EmployeesDayAgenda';

@Injectable({
  providedIn: 'root'
})
export class CleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/booking/cleaning-service";
  }

  createCleaningService(employeeId: number, userId: number, cleaningServiceDto: CleaningServiceDto) {
    if(userId === null){
      return this.http.post(this.baseUrl + "?employeeId=" + employeeId, cleaningServiceDto);
    } else {
      return this.http.post(this.baseUrl + "?employeeId=" + employeeId + "&userId=" + userId, cleaningServiceDto);
    }
  }

  getCleaningServices(): Observable<CleaningServiceDto[]> {
    return this.http.get<CleaningServiceDto[]>(this.baseUrl);
  }

  getCleaningService(id: number): Observable<CleaningServiceDto> {
    return this.http.get<CleaningServiceDto>(this.baseUrl + "/" + id);
  }
}
