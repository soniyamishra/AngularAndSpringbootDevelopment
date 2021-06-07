import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { FormGroup,  FormBuilder,  Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  angForm : FormGroup
  employee : Employee = new Employee();
  id : number;
  constructor(private employeeService : EmployeeService,private route: ActivatedRoute,private fb : FormBuilder,private router: Router) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeId(this.id).subscribe(data =>
      {
        this.employee = data
      }, error => console.log(error));

    this.angForm = this.fb.group({
      firstName: ['',[ Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('[a-zA-Z ]*')]],
       lastName: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(15),Validators.pattern('[a-zA-Z ]*')]],
       emailId: ['', [Validators.required,Validators.email ]],
    });
  }

  goToEmployeeList()
  {
    this.router.navigate(['/employees'])    
  }

  updateEmployee(){
    this.employeeService.updateEmployee(this.id,this.employee).subscribe(data => {
      this.goToEmployeeList();
    }, error => console.log(error))
  }

  onSubmit(){
    this.updateEmployee()
  }

}
