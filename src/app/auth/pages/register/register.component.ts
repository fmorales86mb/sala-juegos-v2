import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private bf:FormBuilder, private router:Router) { 
    this.showSpinner = false;
    this.hasAlert = false;
    this.alertMessage = "";
  }

  clickRegistrarme(){

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

  private equalPassValidator(control: AbstractControl): null|object{
    const pass2 = <string>control.value;
    const pass1 = <string>this.getPassCtrl1().value;

    if(pass1 && pass2){
      if(pass1 != pass2){
        return {
          diferentPass: true
        };
      }      
    }
    else{
      return null;
    }
  }

  ngOnInit(): void {
    this.registerForm = this.bf.group({
      nameCtrl:['', [Validators.required, Validators.minLength(4)]],
      emailCtrl:['', [Validators.required, Validators.email]],
      passCtrl1:['', [Validators.required, Validators.minLength(6)]],
      passCtrl2:['', [Validators.required, Validators.minLength(6), this.equalPassValidator]]
    })
  }
}
