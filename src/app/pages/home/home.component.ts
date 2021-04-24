import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm: FormGroup;
  public titleGame:string;

  constructor(private fb:FormBuilder) {
    this.titleGame = "Ta-Te-Ti";
   }

  clickIngresar(){
    console.log(this.loginForm);
  }

  ngOnInit(): void {

  }

}
