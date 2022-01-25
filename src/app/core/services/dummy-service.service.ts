import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyServiceService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/"
  }

  getDummyString() : Observable<any>{
    return this.http.get(this.baseUrl + "dummyString", {responseType: 'text'});
  }
}
