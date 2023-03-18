import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { MessageResponseDto } from '../model/MessageResponseDto';
import { ModifyPasssword } from '../model/creation/users/ModifyPassword';
import { UserDto } from '../model/UserDto';
import { UserInformation } from '../model/users/UserInformation';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/client/";
  }

  getClientsCleaningServices(userId: number): Observable<CleaningService[]> {
    return this.http.get<CleaningService[]>(this.baseUrl + "cleaning-services/" + userId);
  }
}
