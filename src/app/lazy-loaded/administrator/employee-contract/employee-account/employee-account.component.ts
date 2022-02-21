import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDto } from 'src/app/core/dto/EmployeeDto';
import { UserCredentialDto } from 'src/app/core/dto/UserCredentialDto';
import { AuthService } from 'src/app/core/services/auth.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.scss']
})
export class EmployeeAccountComponent implements OnInit {

  showEye: boolean = false;
  employeeDto!: EmployeeDto;
  existingCredentials!: UserCredentialDto[];
  submitted: boolean = false;

  constructor(
    public employeeService: EmployeeService,
    private authApi: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.employeeDto = this.employeeService.employeeDto;
    this.authApi.getExistingUserCredentials().subscribe(res => {
      this.existingCredentials = res;
    })
  }

  existingControl(model: any){
    const name: string = model.name;
    const control = model.control;
    if(this.existingCredentials.findIndex(userCredential => userCredential[name as keyof UserCredentialDto] === control.value) !== -1){
      control.setErrors({duplicate: {message: 'Already existing ' + name}});
    }
  }

  nextPage(username: FormControl, email: FormControl, password: FormControl) {
    if (this.validControls(username, email, password)) {
      this.router.navigate(['administrator/employee-contract/personal-info']);
      this.employeeService.canAccessUserInfo = true;
      return;
    }
    this.submitted = true;
  }

  private validControls(username: FormControl, email: FormControl, password: FormControl){
    return username.valid && email.valid && password.valid;
  }

  onFocus(){
    this.showEye = true;
  }

}
