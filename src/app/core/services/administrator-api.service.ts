import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningServiceDescriptionsDto } from '../dto/CleaningServiceDescriptionDto';
import { CleaningServicePricesDto } from '../dto/CleaningServicePricesDto';
import { EmployeeDto } from '../dto/EmployeeDto';
import { ServicesAgenda } from '../dto/ServicesAgenda';

@Injectable({
  providedIn: 'root'
})
export class AdministratorApiService {
  baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator/";
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.baseUrl + "employees");
  }

  getServicesAgenda(date: string): Observable<ServicesAgenda[]> {
    return this.http.get<ServicesAgenda[]>(this.baseUrl + "services-agenda?date=" + date);
  }

  createDescriptions(dto: CleaningServiceDescriptionsDto) {
    return this.http.post(this.baseUrl + "create-descriptions", dto);
  }

  updateDescriptions(id: number, dto: CleaningServiceDescriptionsDto) {
    return this.http.put(this.baseUrl + 'update-descriptions/' + id, dto)
  }

  createCleaningPrices(dto: CleaningServicePricesDto) {
    return this.http.post(this.baseUrl + "create-prices", dto);
  }

  updateCleaningPrices(id: number, dto: CleaningServicePricesDto) {
    return this.http.put(this.baseUrl + 'update-prices/' + id, dto)
  }
}
