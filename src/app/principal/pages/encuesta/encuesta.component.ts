import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  public encuestaForm: FormGroup;
  alertMessage:string;
  showSpinner:boolean;
  games:string[];

  constructor(private bf:FormBuilder) { }

  ngOnInit(): void {
    this.alertMessage = "";
    this.games = [];
    this.games.push("Ta-Te-Ti");
    this.games.push("Piedra, papel o tijera");
    this.games.push("Memotest");
    this.games.push("Propio");

    this.encuestaForm = this.bf.group({
      nameCtrl:['', [Validators.required, Validators.minLength(4)]],
      lastNameCtrl:['', [Validators.required, Validators.minLength(4)]],
      ageCtrl:['', [Validators.required, Validators.max(98), Validators.min(19), Validators.pattern("^[0-9]*$")]],
      phoneCtrl:['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      q1Ctrl:['', [Validators.required]]
    });
  }

  clickGuardarEncuesta(){
    console.log("click!");
  }

  getNameCtrl(){
    return this.encuestaForm.get("nameCtrl");
  }

  getLastNameCtrl(){
    return this.encuestaForm.get("lastNameCtrl");
  }

  getAgeCtrl(){
    return this.encuestaForm.get("ageCtrl");
  }

  getPhoneCtrl(){
    return this.encuestaForm.get("phoneCtrl");
  }
  
  getQ1Ctrl(){
    return this.encuestaForm.get("q1Ctrl");
  }
}
