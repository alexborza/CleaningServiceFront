import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningDescriptionCreation } from '../model/creation/cleaning_service/description/CleaningDescriptionCreation';
import { CleaningPrices } from '../model/representation/cleaning_service/prices/CleaningPrices';
import { User } from '../model/representation/users/User';

@Injectable({
  providedIn: 'root'
})
export class AdministratorApiService {
  baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator/";
  }

  getAllEmployees(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "employees");
  }

  // getServicesAgenda(date: string): Observable<ServicesAgenda[]> {
  //   return this.http.get<ServicesAgenda[]>(this.baseUrl + "services-agenda?date=" + date);
  // }

  createDescriptions(dto: CleaningDescriptionCreation) {
    return this.http.post(this.baseUrl + "create-descriptions", dto);
  }

  updateDescriptions(id: number, dto: CleaningDescriptionCreation) {
    return this.http.put(this.baseUrl + 'update-descriptions/' + id, dto)
  }

  createCleaningPrices(dto: CleaningPrices) {
    return this.http.post(this.baseUrl + "create-prices", dto);
  }

  updateCleaningPrices(id: number, dto: CleaningPrices) {
    return this.http.put(this.baseUrl + 'update-prices/' + id, dto)
  }
}
