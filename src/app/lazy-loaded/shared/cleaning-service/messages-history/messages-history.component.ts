import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageCreation } from 'src/app/core/model/creation/cleaning_service/MessageCreation';
import { Message } from 'src/app/core/model/representation/cleaning_service/Message';
import { checkRequiredFields } from 'src/app/core/services/error/validate';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';

@Component({
  selector: 'app-messages-history',
  templateUrl: './messages-history.component.html',
  styleUrls: ['./messages-history.component.scss']
})
export class MessagesHistoryComponent implements OnInit {

  @Input() id: number;
  @Input() messages: Message[] = [];
  form: FormGroup;
  @Output() messageCreation = new EventEmitter<MessageCreation>();

  constructor(
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.buildForm();
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
    this.messageCreation.emit(messageCreation);
    this.form.reset();
  }

}
