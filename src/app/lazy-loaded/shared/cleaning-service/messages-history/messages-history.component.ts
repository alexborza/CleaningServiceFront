import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/core/model/representation/cleaning_service/Message';
import { CleaningApiService } from 'src/app/core/services/cleaning-api.service';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-messages-history',
  templateUrl: './messages-history.component.html',
  styleUrls: ['./messages-history.component.scss']
})
export class MessagesHistoryComponent implements OnInit {

  @Input() id: any;
  form: FormGroup;
  messages: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getMessagesForCleaningService();
  }

  private buildForm(){
    this.form = this.fb.group({
      message: new FormControl(null, [Validators.required]),
    });
  }

  private getMessagesForCleaningService(){
    this.cleaningApi.getMessagesForCleaningService(this.id).subscribe(res => {
      this.messages = res;
    })
  }

  onSubmit(formValue){
    this.checkRequiredFields();
    if(this.form.valid){
      this.submitForm(formValue); 
    }
  }

  private checkRequiredFields(){
    checkRequiredFields(this.form.controls);
  }

  private submitForm(formValue){
    const date = formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en-US');
    const sender = this.tokenStorage.getUser().username;
    let dto = new Message(date, sender, formValue.message);
    this.cleaningApi.addMessageToCleaningService(this.id, dto).subscribe(res => {
      this.getMessagesForCleaningService();
      this.form.reset();
    })
  }

}
