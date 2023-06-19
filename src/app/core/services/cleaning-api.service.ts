import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { CleaningPrices } from '../model/representation/cleaning_service/prices/CleaningPrices';
import { CleaningServiceCreation } from '../model/creation/cleaning_service/CleaningServiceCreation';
import { CleaningDescription } from '../model/representation/cleaning_service/description/CleaningDescription';
import { CleaningServiceMinimal } from '../model/representation/cleaning_service/CleaningServiceMinimal';
import { MessageCreation } from '../model/creation/cleaning_service/MessageCreation';
import { Message } from '../model/representation/cleaning_service/Message';

@Injectable({
  providedIn: 'root'
})
export class CleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/cleaning-service";
  }

  findClientsCleaningServices(userId: number): Observable<CleaningServiceMinimal[]> {
    return this.http.get<CleaningServiceMinimal[]>(this.baseUrl + "/client/" + userId);
  }

  getCleaningService(id: number): Observable<CleaningService> {
    return this.http.get<CleaningService>(this.baseUrl + "/" + id);
  }

  createCleaningService(clientId: number, cleaningServiceCreation: CleaningServiceCreation) {
    if(clientId === null){
      return this.http.post(this.baseUrl, cleaningServiceCreation);
    } else {
      return this.http.post(this.baseUrl + "?clientId=" + clientId, cleaningServiceCreation);
    }
  }

  addMessageToCleaningService(id: number, messageCreation: MessageCreation) {
    return this.http.post(this.baseUrl + '/message/' + id, messageCreation);
  }

  getCleaningServiceMessages(cleaningServiceId: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.baseUrl + "/messages/" + cleaningServiceId);
  }
  

  getCleaningDescriptions(): Observable<CleaningDescription> {
    return this.http.get<CleaningDescription>(this.baseUrl + "/descriptions");
  }

  getCleaningPrices(): Observable<CleaningPrices> {
    return this.http.get<CleaningPrices>(this.baseUrl + '/prices');
  }
}
