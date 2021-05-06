import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { RegistroJuego } from '../../models/registro-juego';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-juego-propio',
  templateUrl: './juego-propio.component.html',
  styleUrls: ['./juego-propio.component.scss']
})
export class JuegoPropioComponent implements OnInit {

  nro1:number;
  nro2:number;
  result:any;
  resultadoSuma:number;
  tiempoFuera:boolean;
  options:number[];
  hasSelected:boolean;
  srcResultado:string;
  srcBase:string = "../../../../assets/";
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
  }

  ngOnInit(): void {  
    // if(this.userService.currentUser){
    //   this.userName = this.userService.currentUser.name;
    // }
    // else{
    //   this.userName = "Test";
    // }
    this.userName = this.userService.currentUser.name;

    this.registroJuego.juego = "Quema Coco";
    this.registroJuego.juegoId = 4;
    //this.registroJuego.userEmail = this.userService.currentUser? this.userService.currentUser.email:"test@email.com";
    this.registroJuego.userEmail = this.userService.currentUser.email;
    this.registroJuego.userName = this.userName;

    this.registroService.setCollection("registro-"+this.registroJuego.userEmail);

    this.initGame();
  }

    
  public guardarRegistroDelJuego(){
    this.registroJuego.derrotas = this.derrotas;
    this.registroJuego.victorias = this.triunfos;
    this.registroJuego.empates = this.empates;
    this.registroJuego.fechaHora = Date.now();

    this.registroService.addItem(this.registroJuego);
  }

  waitTime(seconds:number){
    setTimeout( () => { 
      if(!this.hasSelected){
        this.tiempoFuera = true;
        this.result = this.nro1 + this.nro2;     
        this.perder();  
      }else{
        
      }      
    }, seconds*1000 );    
  }

  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  initGame(){
    this.srcResultado = "";
    this.result= "?";
    this.hasSelected = false;
    this.tiempoFuera = false;
    this.nro1 = this.getRandomInt(1, 99);
    this.nro2 = this.getRandomInt(1, 99);
    this.resultadoSuma = this.nro1 + this.nro2;

    this.setOptions();

    this.waitTime(3);
  }

  setOptions(){
    this.options = [
      this.getRandomInt(2, 198),
      this.getRandomInt(2, 198),
      this.getRandomInt(2, 198),
      this.getRandomInt(2, 198)
    ]

    let indexCorrecto = this.getRandomInt(0,3);

    this.options[indexCorrecto] = this.resultadoSuma;
  }

  clickOption(index:number){
    if(!this.tiempoFuera){
      this.hasSelected = true;
      if(this.options[index] == this.resultadoSuma){
        this.ganar();
      } 
      else{
        this.perder();
      }
      this.result = this.resultadoSuma;    
    }
  }

  ganar(){
    this.juegoIniciado = true;
    this.srcResultado= this.srcBase + "ganar.jpg";
    this.triunfos++;
  }

  perder(){
    this.juegoIniciado = true;
    this.srcResultado=this.srcBase +"perder.jpg";
    this.derrotas++;
  }  

  clickVolverJugar(){
    this.initGame();
  }
}
