import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { RegistroJuego } from '../../models/registro-juego';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {

  srcPiedra:string = "../../../../assets/piedra.jpg";
  srcPapel:string = "../../../../assets/papel.jpg";
  srcTijera:string = "../../../../assets/tijera.jpg";
  srcIncognita:string;
  srcResultado:string;
  bloquear:boolean;
  triunfos:number;
  derrotas:number;
  empates:number;
  userName:string;
  juegoIniciado:boolean;
  registroJuego:RegistroJuego;

  constructor(private userService:UsersService, private registroService: RegistroService) { 
    this.triunfos = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.registroJuego = new RegistroJuego();   
    this.juegoIniciado = false;
    this.setInitialStatus();
  }

  ngOnInit(): void {
    // if(this.userService.currentUser){
    //   this.userName = this.userService.currentUser.name;
    // }
    // else{
    //   this.userName = "Test";
    // }

    this.userName = this.userService.currentUser.name;
    this.registroJuego.juego = "Piedra, Papel o Tijera";
    this.registroJuego.juegoId = 1;
    //this.registroJuego.userEmail = this.userService.currentUser? this.userService.currentUser.email:"test@email.com";
    this.registroJuego.userEmail = this.userService.currentUser.email;
    this.registroJuego.userName = this.userName;

    this.registroService.setCollection("registro-"+this.registroJuego.userEmail);
  }

  chose(id:number){

    if(!this.bloquear){
      this.executeLogic(id);
    }
  }

  executeLogic(id:number){
    this.bloquear = true;
    let seconds = 2;
    let maquina = this.getRandomInt(1,3);

    switch(maquina){
      case 1:
        this.srcIncognita = "../../../../assets/piedra.jpg";
        break;
      case 2:
        this.srcIncognita = "../../../../assets/papel.jpg";
        break;
      case 3:
        this.srcIncognita = "../../../../assets/tijera.jpg";
        break;
    }

    let resultado: number = this.getResultado(id, maquina);

    switch(resultado){
      case 0:
        this.empates++;
        seconds = 1;
        this.srcResultado = "";
        break;
      case 1:
        this.triunfos++;
        this.srcResultado = "../../../../assets/ganar.jpg";
        break;
      case 2:
        this.derrotas++;
        this.srcResultado = "../../../../assets/perder.jpg";
        break;      
    }    

    this.waitTime(seconds);
  }

  getResultado(humano:number, maquina:number):number{
    if(humano != maquina){
      this.juegoIniciado = true;
    }
    if(humano == maquina){
      return 0;
    }
    if(humano == 1 && maquina == 3){
      return 1;
    }
    else if(humano == 2 && maquina == 1){
      return 1;
    }
    else if(humano == 3 && maquina == 2){
      return 1;
    }
    else{
      return 2;
    }
  }

  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  setInitialStatus(){
    this.bloquear = false;
     
    this.srcIncognita = "../../../../assets/incognita.jpg";
    this.srcResultado ="";
    
  }

  waitTime(seconds:number){
    setTimeout( () => { 
      this.setInitialStatus();
    }, seconds*1000 );
  }
  
  public guardarRegistroDelJuego(){
    this.registroJuego.derrotas = this.derrotas;
    this.registroJuego.victorias = this.triunfos;
    this.registroJuego.empates = this.empates;
    this.registroJuego.fechaHora = Date.now();

    this.registroService.addItem(this.registroJuego);
  }
}
