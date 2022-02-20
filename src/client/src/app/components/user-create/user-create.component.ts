import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit { 
  submitted = false;
  userForm: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: UserService
  ) { 
    this.mainForm();
  }
  
  ngOnInit() { }
  
  mainForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
  }
  
  // Getter to access form control
  get myForm() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return false;
    } else {
      this.apiService.createUser(this.userForm.value).subscribe(
        (res) => {
          console.log('User successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
        }, (error) => {
          console.log(error);
        });

        return true;
    }
  }
}
