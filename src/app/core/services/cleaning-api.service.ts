import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningDateDto } from '../model/CleaningDateDto';
import { CleaningServiceDescriptionsDto } from '../model/CleaningServiceDescriptionDto';
import { CleaningServiceDisplay } from '../model/CleaningServiceDisplay';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { CleaningPrices } from '../model/representation/cleaning_service/prices/CleaningPrices';
import { DatesToRescheduleDto } from '../model/DatesToRescheduleDto';
import { Message } from '../model/representation/cleaning_service/Message';
import { RescheduleDateDto } from '../model/RescheduleDateDto';

@Injectable({
  providedIn: 'root'
})
export class CleaningApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/booking/cleaning-service";
  }

  createCleaningService(employeeId: number, userId: number, cleaningServiceDto: CleaningService) {
    if(userId === null){
      return this.http.post(this.baseUrl + "?employeeId=" + employeeId, cleaningServiceDto);
    } else {
      return this.http.post(this.baseUrl + "?employeeId=" + employeeId + "&userId=" + userId, cleaningServiceDto);
    }
  }

  getCleaningServices(): Observable<CleaningServiceDisplay[]> {
    return this.http.get<CleaningServiceDisplay[]>(this.baseUrl);
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

  getDatesOfCleaningForCleaningService(id: number): Observable<CleaningDateDto[]>{
    return this.http.get<CleaningDateDto[]>(this.baseUrl + "/dates-of-cleaning/" + id);
  }

  getNextCleaningDate(id: number): Observable<CleaningDateDto> {
    return this.http.get<CleaningDateDto>(this.baseUrl + "/next-cleaning-date/" + id);
  }

  getDescriptions(): Observable<CleaningServiceDescriptionsDto> {
    return this.http.get<CleaningServiceDescriptionsDto>(this.baseUrl + "/descriptions");
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

  getDatesToReschedule(id: number): Observable<DatesToRescheduleDto[]> {
    return this.http.get<DatesToRescheduleDto[]>(this.baseUrl + "/dates-to-reschedule/" + id);
  }

  rescheduleCleaningService(id: number, dto: RescheduleDateDto) {
    return this.http.post(this.baseUrl + "/reschedule/" + id, dto);
  }
}
