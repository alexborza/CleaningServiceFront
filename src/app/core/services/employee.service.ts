import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeContractCreation } from '../model/creation/users/EmployeeContractCreation';
import { JobInformationCreation } from '../model/creation/users/JobInformationCreation';
import { UserInformationCreation } from '../model/creation/users/UserInformationCreation';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "";
  employeeContractCreation: EmployeeContractCreation = new EmployeeContractCreation();
  canAccessUserInfo: boolean = false;
  canAccessJobInfo: boolean = false;
  canAccessEmergencyInfo: boolean = false;
  canAccessConfirmation: boolean = false;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator";
    this.createNewEmployee();
  }

  createNewEmployee(){
    this.employeeContractCreation = new EmployeeContractCreation();
    this.employeeContractCreation.userInformationCreation = new UserInformationCreation()
    this.employeeContractCreation.jobInformationCreation = new JobInformationCreation()
    this.canAccessUserInfo = false;
    this.canAccessJobInfo = false;
    this.canAccessEmergencyInfo = false;
    this.canAccessConfirmation = false;
  }

  createEmployeeContract(dto: EmployeeContractCreation): Observable<void> {
    return this.http.post<void>(this.baseUrl + "/employee-contract", dto);
  }

}
