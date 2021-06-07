import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import {EmployeeService} from '../employee.service';
import { FormGroup,  FormBuilder,  Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  angForm : FormGroup

  employee :Employee = new Employee();
  constructor(private employeeService : EmployeeService, private router : Router,private fb : FormBuilder) { 
   
  }

  ngOnInit(): void {

    this.angForm = this.fb.group({
      firstName: ['',[ Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('[a-zA-Z ]*')]],
       lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('[a-zA-Z ]*')]],
       emailId: ['', [Validators.required,Validators.email ]],
    });
  }
  
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe(data =>{
      console.log(data);
      this.goToEmployeeList();
      
    },  error => console.log(error));
    
  }

  goToEmployeeList()
  {
    this.router.navigate(['/employees'])    
  }
  onSubmit()
  {
    console.log(this.employee);
    this.saveEmployee();
    
  }

}
