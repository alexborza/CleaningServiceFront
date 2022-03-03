import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageResponseDto } from '../dto/MessageResponseDto';
import { ModifyPassswordDto } from '../dto/ModifyPasswordDto';
import { UserDto } from '../dto/UserDto';
import { UserInformationDto } from '../dto/UserInformationDto';

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

  modifyPassword(userId: number, dto: ModifyPassswordDto): Observable<MessageResponseDto> {
    return this.http.post<MessageResponseDto>(this.baseUrl + "password/" + userId, dto);
  }

  modifyPersonalInfo(userId: number, dto: UserInformationDto) {
    return this.http.post(this.baseUrl + "personal-info/" + userId, dto);
  }
}
