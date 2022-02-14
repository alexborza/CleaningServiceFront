import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficeCleaningDto } from 'src/app/core/dto/OfficeCleaningDto';
import { OfficeCleaningApiService } from 'src/app/core/services/office-cleaning-api.service';

@Component({
  selector: 'app-quote-requests',
  templateUrl: './quote-requests.component.html',
  styleUrls: ['./quote-requests.component.scss']
})
export class QuoteRequestsComponent implements OnInit {

  quoteRequests: OfficeCleaningDto[] = [];

  constructor(private officeCleaningApi: OfficeCleaningApiService,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.getQuoteRequests();
  }

  getQuoteRequests(){
    this.officeCleaningApi.getQuoteRequests().subscribe(res => {
      this.quoteRequests = res;
    });
  }

  onRowSelect(event: any){
    this.router.navigate([event.data.id], {relativeTo: this.route});
  }

}
