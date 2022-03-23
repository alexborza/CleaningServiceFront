import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningDateDto } from '../dto/CleaningDateDto';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';

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
  
  endCleaningService(id: number) {
    return this.http.put(this.baseUrl + "/end-service/" + id, {});
  }

  finishCleaningService(id: number, date: string) {
    return this.http.put(this.baseUrl + "/finish-service/" + id + "?date=" + date, {});
  }

  getDatesOfCleaningForCleaningService(id: number): Observable<CleaningDateDto[]>{
    return this.http.get<CleaningDateDto[]>(this.baseUrl + "/dates-of-cleaning/" + id);
  }

  getNextCleaningDate(id: number): Observable<CleaningDateDto> {
    return this.http.get<CleaningDateDto>(this.baseUrl + "/next-cleaning-date/" + id);
  }
}
