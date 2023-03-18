import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../model/MessageResponseDto';
import { ModifyPasssword } from '../model/creation/users/ModifyPassword';
import { UserDto } from '../model/UserDto';
import { UserInformation } from '../model/users/UserInformation';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/user/";
  }

  getUser(userId: number): Observable<UserDto>{
    return this.http.get<UserDto>(this.baseUrl + userId);
  }

  modifyEmail(userId: number, email: string) {
    return this.http.post(this.baseUrl + "email/" + userId, email);
  }

  modifyPassword(userId: number, dto: ModifyPasssword): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(this.baseUrl + "password/" + userId, dto);
  }

  modifyPersonalInfo(userId: number, dto: UserInformation) {
    return this.http.post(this.baseUrl + "personal-info/" + userId, dto);
  }
}
