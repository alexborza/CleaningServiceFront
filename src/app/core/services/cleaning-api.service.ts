import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createCleaningService(userId: number, cleaningServiceDto: CleaningServiceDto) {
    if(userId === null){
      return this.http.post(this.baseUrl, cleaningServiceDto);  
    } else {
      return this.http.post(this.baseUrl, cleaningServiceDto, { params: new HttpParams().set('userId', userId)});  
    }
  }

  getCleaningServices(): Observable<CleaningServiceDto[]> {
    return this.http.get<CleaningServiceDto[]>(this.baseUrl);
  }

  getCleaningService(id: number): Observable<CleaningServiceDto> {
    return this.http.get<CleaningServiceDto>(this.baseUrl + "/" + id);
  }
}
