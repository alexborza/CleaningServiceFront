import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningDateDto } from '../dto/CleaningDateDto';
import { CleaningServiceDescriptionsDto } from '../dto/CleaningServiceDescriptionDto';
import { CleaningServiceDisplay } from '../dto/CleaningServiceDisplay';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';
import { CleaningServicePricesDto } from '../dto/CleaningServicePricesDto';
import { DatesToRescheduleDto } from '../dto/DatesToRescheduleDto';
import { MessageDto } from '../dto/MessageDto';
import { RescheduleDateDto } from '../dto/RescheduleDateDto';

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

  getCleaningServices(): Observable<CleaningServiceDisplay[]> {
    return this.http.get<CleaningServiceDisplay[]>(this.baseUrl);
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

  getNextCleaningDate(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/next-cleaning-date/" + id);
  }

  getDescriptions(): Observable<CleaningServiceDescriptionsDto> {
    return this.http.get<CleaningServiceDescriptionsDto>(this.baseUrl + "/descriptions");
  }

  getCleaningServicePrices(): Observable<CleaningServicePricesDto> {
    return this.http.get<CleaningServicePricesDto>(this.baseUrl + '/prices');
  }

  getMessagesForCleaningService(id: number): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(this.baseUrl + '/messages/' + id);
  }

  addMessageToCleaningService(id: number, dto: MessageDto) {
    return this.http.post(this.baseUrl + '/message/' + id, dto);
  }

  getDatesToReschedule(id: number): Observable<DatesToRescheduleDto[]> {
    return this.http.get<DatesToRescheduleDto[]>(this.baseUrl + "/dates-to-reschedule/" + id);
  }

  rescheduleCleaningService(id: number, dto: RescheduleDateDto) {
    return this.http.post(this.baseUrl + "/reschedule/" + id, dto);
  }
}
