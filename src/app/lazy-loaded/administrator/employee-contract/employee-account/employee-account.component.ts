import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeContractCreation } from 'src/app/core/model/creation/users/EmployeeContractCreation';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.scss']
})
export class EmployeeAccountComponent implements OnInit {

  showEye: boolean = false;
  employeeContractCreation: EmployeeContractCreation;
  submitted: boolean = false;

  constructor(
    public employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.employeeContractCreation = this.employeeService.employeeContractCreation;
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
