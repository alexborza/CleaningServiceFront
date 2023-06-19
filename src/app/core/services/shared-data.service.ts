import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public toasterMessage = new BehaviorSubject<any>(false);
  public isLoadingData = new BehaviorSubject<boolean>(false);

  constructor() { }
}
