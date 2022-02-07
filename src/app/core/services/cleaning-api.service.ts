import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';

@Injectable({
  providedIn: 'root'
})
export class CleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/booking/cleaning-service";
  }

  createCleaningService(cleaningServiceDto: CleaningServiceDto) {
    return this.http.post(this.baseUrl, cleaningServiceDto);
  }

  getBookedHoursForDate(date: string): Observable<string[]>{
    return this.http.get<string[]>(this.baseUrl + "/booked-hours?date=" + date);
  }

  getCleaningServices(): Observable<CleaningServiceDto[]> {
    return this.http.get<CleaningServiceDto[]>(this.baseUrl);
  }

  getCleaningService(id: number): Observable<CleaningServiceDto> {
    return this.http.get<CleaningServiceDto>(this.baseUrl + "/" + id);
  }
}
