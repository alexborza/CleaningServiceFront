import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { OfficeCleaningDto } from 'src/app/core/dto/OfficeCleaningDto';
import { OfficeCleaningQuoteRequestDto } from 'src/app/core/dto/OfficeCleaningQuoteRequestDto';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { OfficeCleaningApiService } from 'src/app/core/services/office-cleaning-api.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-quote-request',
  templateUrl: './quote-request.component.html',
  styleUrls: ['./quote-request.component.scss']
})
export class QuoteRequestComponent implements OnInit {

  id: any;
  officeCleaningDto!: OfficeCleaningDto;
  form!: FormGroup;
  hasAdminRole = false;

  constructor(
      private route: ActivatedRoute,
      private tokenStorage: TokenStorageService,
      private fb: FormBuilder,
      private messageService: MessageService,
      private officeCleaningApi: OfficeCleaningApiService          
    ) { }

  ngOnInit(): void {
    if(this.tokenStorage.getUser().roles.includes('ROLE_ADMIN')){
      this.hasAdminRole = true;
    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.getQuoteRequest();
    this.buildForm();
  }

  buildForm(){
    if(this.hasAdminRole){
      this.form = this.fb.group({
        description: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required])
      })
    }
  }

  getQuoteRequest(){
    this.officeCleaningApi.getQuoteRequest(+this.id).subscribe(res => {
      this.officeCleaningDto = res;
    })
  }

  onSubmit(formValue: any){
    this.checkRequiredFields();
    if(this.form.valid){
      const quoteRequest: OfficeCleaningQuoteRequestDto =  this.createQuoteRequest(formValue);
      this.officeCleaningApi.updateQuoteRequestForOfficeCleaning(this.id, quoteRequest).subscribe(res => {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully sent a quote request'});
        this.getQuoteRequest();
      });
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'The field is required'});
    }
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private createQuoteRequest(formValue: any){
    const quoteRequest = new OfficeCleaningQuoteRequestDto();
    quoteRequest.price = formValue.price;
    quoteRequest.description = formValue.description;
    return quoteRequest;
  }

}
