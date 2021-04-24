import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      pass:['', [Validators.required, Validators.minLength(6)]]
    });
   }

  clickIngresar(){
    console.log(this.loginForm);
  }

  ngOnInit(): void {

  }

}
