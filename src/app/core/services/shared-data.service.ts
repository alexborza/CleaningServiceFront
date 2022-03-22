import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public toasterMessage = new BehaviorSubject<any>(false);

  constructor() { }
}
