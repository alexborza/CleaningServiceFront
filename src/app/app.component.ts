import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedDataService } from './core/services/shared-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  
  loadingSubscription: Subscription;
  showSpinner = true;
  title = "CleaningServiceFront";

  constructor(
    private sharedData: SharedDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.sharedData.isLoadingData.subscribe(res => {
      this.showSpinner = res;
    })
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
