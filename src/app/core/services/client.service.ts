import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';
import { MessageResponseDto } from '../dto/MessageResponseDto';
import { ModifyPassswordDto } from '../dto/ModifyPasswordDto';
import { OfficeCleaningDto } from '../dto/OfficeCleaningDto';
import { UserDto } from '../dto/UserDto';
import { UserInformationDto } from '../dto/UserInformationDto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/client/";
  }

  getClientsCleaningServices(userId: number): Observable<CleaningServiceDto[]> {
    return this.http.get<CleaningServiceDto[]>(this.baseUrl + "cleaning-services/" + userId);
  }

  getClientsOfficeCleanings(userId: number): Observable<OfficeCleaningDto[]> {
    return this.http.get<OfficeCleaningDto[]>(this.baseUrl + "office-cleanings/" + userId);
  }
}
