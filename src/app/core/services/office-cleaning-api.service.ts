import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeCleaningDto } from '../dto/OfficeCleaningDto';

@Injectable({
  providedIn: 'root'
})
export class OfficeCleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/office-cleaning-service";
  }

  quoteRequestForOfficeCleaning(dto: OfficeCleaningDto): Observable<OfficeCleaningDto>{
    return this.http.post<OfficeCleaningDto>(this.baseUrl + "/quote-request", dto);
  }
}
