import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningDescriptionCreation } from '../model/creation/cleaning_service/description/CleaningDescriptionCreation';
import { CleaningPriceCreation } from '../model/creation/cleaning_service/prices/CleaningPriceCreation';
import { EmployeeContractCreation } from '../model/creation/users/EmployeeContractCreation';
import { EmployeeAppointment } from '../model/representation/appointment/EmployeeAppointment';
import { CleaningServiceMinimal } from '../model/representation/cleaning_service/CleaningServiceMinimal';
import { MinimalUser } from '../model/representation/users/MinimalUser';

@Injectable({
  providedIn: 'root'
})
export class AdministratorApiService {
  baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator";
  }

  createEmployeeContract(employeeContractCreation: EmployeeContractCreation) {
    return this.http.post(this.baseUrl + "/employee-contract", employeeContractCreation);
  }

  getAllEmployees(): Observable<MinimalUser[]> {
    return this.http.get<MinimalUser[]>(this.baseUrl + "/employees");
  }

  getAllEmployeesAppointmentsByDate(date: string): Observable<EmployeeAppointment[]> {
    return this.http.get<EmployeeAppointment[]>(this.baseUrl + "/employees-appointments/" + date);
  } 

  createDescriptions(cleaningDescriptionCreation: CleaningDescriptionCreation) {
    return this.http.post(this.baseUrl + "/create-descriptions", cleaningDescriptionCreation);
  }

  createCleaningPrices(cleaningPriceCreation: CleaningPriceCreation) {
    return this.http.post(this.baseUrl + "/create-prices", cleaningPriceCreation);
  }

  getAllCleaningServices(): Observable<CleaningServiceMinimal[]> {
    return this.http.get<CleaningServiceMinimal[]>(this.baseUrl + "/all-cleaning-services");
  }
}
