import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageCreation } from 'src/app/core/model/creation/cleaning_service/MessageCreation';
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

  @Input() id: number;
  messages: Message[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private cleaningApi: CleaningApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getCleaningServiceMessages();
  }

  private getCleaningServiceMessages() {
    this.cleaningApi.getCleaningServiceMessages(this.id).subscribe(res => {
      this.messages = res;
    })
  }

  private buildForm(){
    this.form = this.fb.group({
      message: new FormControl(null, [Validators.required]),
    });
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
    const sender = this.tokenStorage.getUser().username;
    let messageCreation = new MessageCreation(sender, formValue.message);
    this.cleaningApi.addMessageToCleaningService(this.id, messageCreation).subscribe(res => {
      this.getCleaningServiceMessages();
      this.form.reset();
    })
  }

}
