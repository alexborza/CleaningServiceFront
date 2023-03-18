import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmergencyContactInformationDto } from '../model/EmergencyContactInformationDto';
import { EmployeeDto } from '../model/EmployeeDto';
import { EmployeeInformationDto } from '../model/EmployeeInformationDto';
import { JobInformation } from '../model/users/JobInformation';
import { MessageResponseDto } from '../model/MessageResponseDto';
import { UserInformation } from '../model/users/UserInformation';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "";
  employeeDto: EmployeeDto = new EmployeeDto();
  canAccessUserInfo: boolean = false;
  canAccessJobInfo: boolean = false;
  canAccessEmergencyInfo: boolean = false;
  canAccessConfirmation: boolean = false;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator";
    this.createNewEmployee();
  }

  createNewEmployee(){
    this.employeeDto = new EmployeeDto();
    this.employeeDto.userInformation = new UserInformation()
    this.employeeDto.employeeInformation = new EmployeeInformationDto()
    this.employeeDto.employeeInformation.jobInformation = new JobInformation()
    this.employeeDto.employeeInformation.emergencyContactInformation = new EmergencyContactInformationDto()
    this.canAccessUserInfo = false;
    this.canAccessJobInfo = false;
    this.canAccessEmergencyInfo = false;
    this.canAccessConfirmation = false;
  }

  createEmployeeContract(dto: EmployeeDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(this.baseUrl + "/employee-contract", dto);
  }

}
