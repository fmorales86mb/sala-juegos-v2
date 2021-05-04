import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/auth/services/users.service';
import { Encuesta } from '../../models/encuesta';
import { EncuestaService } from '../../services/encuesta.service';

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
  range:number;

  constructor(private bf:FormBuilder, 
    private userService:UsersService, 
    private encuestaService:EncuestaService) { 
      this.showSpinner = false;
    }

  ngOnInit(): void {
    this.alertMessage = "";
    this.games = [];
    this.games.push("Ta-Te-Ti");
    this.games.push("Piedra, papel o tijera");
    this.games.push("Memotest");
    this.games.push("Propio");
    this.range=2;
    let email = this.userService.currentUser == undefined? "test":this.userService.currentUser.email; 
    this.encuestaService.setCollection("encuesta-"+email)

    this.encuestaForm = this.bf.group({
      nameCtrl:['', [Validators.required, Validators.minLength(4)]],
      lastNameCtrl:['', [Validators.required, Validators.minLength(4)]],
      ageCtrl:['', [Validators.required, Validators.max(98), Validators.min(19), Validators.pattern("^[0-9]*$")]],
      phoneCtrl:['', [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      q1Ctrl:['', [Validators.required]],
      q2Ctrl:['', [Validators.required]],
      q3Ctrl:['', [Validators.required]]
    });
  }

  clickGuardarEncuesta(){
    this.disableControls(true);
    this.showSpinner = true;

    let encuesta: Encuesta = new Encuesta();
    encuesta.nombre = this.getNameCtrl().value;
    encuesta.apellido = this.getLastNameCtrl().value;
    encuesta.edad = this.getAgeCtrl().value;
    encuesta.q1 = this.getQ1Ctrl().value;
    encuesta.puntuacion = this.getQ2Ctrl().value;
    encuesta.enviarInfo = this.getQ3Ctrl().value;

    //console.log(encuesta);
    this.encuestaService.addItem(encuesta).then(() => {
      this.showSpinner = false;
      this.disableControls(false);  
    });
  }

  disableControls(disable:boolean){
    if(disable){
      this.getNameCtrl().disable();
      this.getLastNameCtrl().disable();
      this.getAgeCtrl().disable();
      this.getQ1Ctrl().disable();
      this.getQ2Ctrl().disable();
      this.getQ3Ctrl().disable();
    }else{
      this.getNameCtrl().enable();
      this.getLastNameCtrl().enable();
      this.getAgeCtrl().enable();
      this.getQ1Ctrl().enable();
      this.getQ2Ctrl().enable();
      this.getQ3Ctrl().enable();
    }
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

  getQ2Ctrl(){
    return this.encuestaForm.get("q2Ctrl");
  }

  getQ3Ctrl(){
    return this.encuestaForm.get("q3Ctrl");
  }
}
