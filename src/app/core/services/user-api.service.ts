import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModifyPasssword } from '../model/creation/users/ModifyPassword';
import { UserInformationCreation } from '../model/creation/users/UserInformationCreation';
import { User } from '../model/representation/users/User';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/user";
  }

  getUser(userId: number): Observable<User>{
    return this.http.get<User>(this.baseUrl + "/" + userId);
  }

  updateEmail(userId: number, email: string) {
    return this.http.post(this.baseUrl + "/email/" + userId, email);
  }

  updatePassword(userId: number, dto: ModifyPasssword): Observable<void> {
    return this.http.post<void>(this.baseUrl + "/password/" + userId, dto);
  }

  updateUserInformation(userId: number, userInformationCreation: UserInformationCreation) {
    return this.http.post(this.baseUrl + "/user-info/" + userId, userInformationCreation);
  }
}
