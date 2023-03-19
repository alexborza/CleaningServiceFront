import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { CleaningPrices } from '../model/representation/cleaning_service/prices/CleaningPrices';
import { Message } from '../model/representation/cleaning_service/Message';
import { CleaningServiceCreation } from '../model/creation/cleaning_service/CleaningServiceCreation';
import { CleaningDescription } from '../model/representation/cleaning_service/description/CleaningDescription';

@Injectable({
  providedIn: 'root'
})
export class CleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/booking/cleaning-service";
  }

  createCleaningService(userId: number, cleaningServiceCreation: CleaningServiceCreation) {
    if(userId === null){
      return this.http.post(this.baseUrl, cleaningServiceCreation);
    } else {
      return this.http.post(this.baseUrl + "?userId=" + userId, cleaningServiceCreation);
    }
  }

  getCleaningService(id: number): Observable<CleaningService> {
    return this.http.get<CleaningService>(this.baseUrl + "/" + id);
  }
  
  endCleaningService(id: number) {
    return this.http.put(this.baseUrl + "/end-service/" + id, {});
  }

  finishCleaningService(id: number, date: string) {
    return this.http.put(this.baseUrl + "/finish-service/" + id + "?date=" + date, {});
  }

  getDescriptions(): Observable<CleaningDescription> {
    return this.http.get<CleaningDescription>(this.baseUrl + "/descriptions");
  }

  getCleaningServicePrices(): Observable<CleaningPrices> {
    return this.http.get<CleaningPrices>(this.baseUrl + '/prices');
  }

  getMessagesForCleaningService(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + '/messages/' + id);
  }

  addMessageToCleaningService(id: number, dto: Message) {
    return this.http.post(this.baseUrl + '/message/' + id, dto);
  }
}
