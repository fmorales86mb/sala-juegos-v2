import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardDto } from 'src/app/principal/models/card-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public loginForm: FormGroup;
  public dataTateti:CardDto;
  public dataPiedraPapelTijera:CardDto;
  public dataMemotest:CardDto;
  public dataJuegoPropio:CardDto;

  constructor(private fb:FormBuilder) {
    this.dataPiedraPapelTijera = new CardDto();
    this.dataPiedraPapelTijera.href = "piedra-papel-tijera";
    this.dataPiedraPapelTijera.img = "piedra-papel-tijera-logo.jpg";
    this.dataPiedraPapelTijera.title = "Piedra Papel o Tijera";
   }

  clickIngresar(){
    console.log(this.loginForm);
  }

  ngOnInit(): void {

  }

}
