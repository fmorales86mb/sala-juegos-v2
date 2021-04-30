import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterCredential } from '../../models/register-credential';
import { ResponseFirebase } from '../../models/response-firebase';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public showSpinner:boolean; 
  public hasAlert:boolean; 
  public alertMessage:string;

  constructor(private bf:FormBuilder, 
    private router:Router, 
    private authService:AuthService,
    private userService:UsersService) { 
    this.showSpinner = false;
    this.hasAlert = false;
    this.alertMessage = "";
  }

  async clickRegistrarme(){   
    this.hasAlert = false;
    this.showSpinner = true;
    
    try{
      let registerData = new RegisterCredential(
        this.getEmailCtrl().value,
        this.getPassCtrl1().value,
        this.getNameCtrl().value
      )

      let user = new User();
      user.name = this.getNameCtrl().value;
      user.email = this.getEmailCtrl().value;

      let response: ResponseFirebase = await this.authService.Registrarse(registerData);
      if (await response.ok){  
        this.userService.addItem(user);
        this.router.navigate(['']);
      }
      else{
        this.alertMessage = await response.error.description;
        this.hasAlert = true;
      }
    }
    catch(error){
      this.alertMessage = "Ocurrió un error inesperado";
      this.hasAlert = true;
      console.log(error);
    }
    finally{
      this.showSpinner = false;
    } 
  }

  getNameCtrl(){
    return this.registerForm.get("nameCtrl");
  }

  getEmailCtrl(){
    return this.registerForm.get("emailCtrl");
  }

  getPassCtrl1(){
    return this.registerForm.get("passCtrl1");
  }

  getPassCtrl2(){
    return this.registerForm.get("passCtrl2");
  }

  goToLogin() {this.router.navigate(['login']); }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  ngOnInit(): void {
    this.registerForm = this.bf.group({
      nameCtrl:['', [Validators.required, Validators.minLength(4)]],
      emailCtrl:['', [Validators.required, Validators.email]],
      passCtrl1:['', [Validators.required, Validators.minLength(6)]],
      passCtrl2:['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validator: this.MustMatch('passCtrl1', 'passCtrl2')
    });
  }
}
