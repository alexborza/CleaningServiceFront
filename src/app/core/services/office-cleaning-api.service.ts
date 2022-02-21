import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfficeCleaningDto } from '../dto/OfficeCleaningDto';
import { OfficeCleaningQuoteRequestDto } from '../dto/OfficeCleaningQuoteRequestDto';

@Injectable({
  providedIn: 'root'
})
export class OfficeCleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/office-cleaning-service";
  }

  quoteRequestForOfficeCleaning(userId: number, dto: OfficeCleaningDto): Observable<OfficeCleaningDto>{
    if(userId === null){
      return this.http.post<OfficeCleaningDto>(this.baseUrl + "/quote-request", dto);
    } else {
      return this.http.post<OfficeCleaningDto>(this.baseUrl + "/quote-request", dto, { params: new HttpParams().set('userId', userId)});  
    }
  }

  updateQuoteRequestForOfficeCleaning(id: number, dto: OfficeCleaningQuoteRequestDto) {
    return this.http.put(this.baseUrl + "/quote-request/" + id, dto);
  }

  getQuoteRequests(): Observable<OfficeCleaningDto[]> {
    return this.http.get<OfficeCleaningDto[]>(this.baseUrl + "/quote-requests");
  }

  getQuoteRequest(id: number): Observable<OfficeCleaningDto> {
    return this.http.get<OfficeCleaningDto>(this.baseUrl + "/quote-requests/" + id);
  }
}
