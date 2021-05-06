import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { RegistroJuego } from '../../models/registro-juego';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.scss']
})
export class MemotestComponent implements OnInit {
  
  baseSrc:string = "../../../../assets/";
  celdaCubierta: string;
  celdas:string[];
  srcImages:string[];
  celda1: number;
  celda2: number;
  estado:number;
  intentos:number;
  userName:string;
  habilitarInicio:boolean;
  juegoIniciado:boolean;
  registroJuego:RegistroJuego;
  triunfos:number;
  derrotas:number;
  empates:number;

  constructor(private userService: UsersService, private registroService:RegistroService) { 
    this.triunfos = 0;
    this.derrotas = 0;
    this.empates = 0;
    this.registroJuego = new RegistroJuego(); 
    this.juegoIniciado = false;

    this.celdaCubierta = this.baseSrc + "memotest-celda.jpg";
    this.userName = this.userService.currentUser.name;
    // if(this.userService.currentUser){
    //   this.userName = this.userService.currentUser.name;
    // }
    // else{
    //   this.userName = "Test";
    // }
  }

  ngOnInit(): void {
    this.initCeldas(); 
    this.initImages();   
    this.estado = 0;
    this.intentos = 0;
    this.habilitarInicio = false;

    this.registroJuego.juego = "Memotest";
    this.registroJuego.juegoId = 3;
    //this.registroJuego.userEmail = this.userService.currentUser? this.userService.currentUser.email:"test@email.com";
    this.registroJuego.userEmail = this.userService.currentUser.email;
    this.registroJuego.userName = this.userName;

    this.registroService.setCollection("registro-" + this.registroJuego.userEmail);
  }

  public guardarRegistroDelJuego(){
    this.registroJuego.derrotas = this.derrotas;
    this.registroJuego.victorias = this.triunfos;
    this.registroJuego.empates = this.empates;
    this.registroJuego.intentos = this.intentos;
    this.registroJuego.fechaHora = Date.now();

    this.registroService.addItem(this.registroJuego);
  }

  initCeldas(){
    this.celdas = [];
    for (let i = 1; i <= 12; i++) {
      this.celdas.push(this.celdaCubierta);
    }
  }

  clickComenzar(){
    this.guardarRegistroDelJuego();
    this.ngOnInit();
    this.juegoIniciado = false;
  }

  initImages(){
    this.srcImages = [];
    this.srcImages.push(this.baseSrc + "memo-01.jpg");
    this.srcImages.push(this.baseSrc + "memo-03.jpg");
    this.srcImages.push(this.baseSrc + "memo-04.jpg");
    this.srcImages.push(this.baseSrc + "memo-02.jpg");
    this.srcImages.push(this.baseSrc + "memo-01.jpg");
    this.srcImages.push(this.baseSrc + "memo-06.jpg");
    this.srcImages.push(this.baseSrc + "memo-05.jpg");
    this.srcImages.push(this.baseSrc + "memo-06.jpg");
    this.srcImages.push(this.baseSrc + "memo-03.jpg");
    this.srcImages.push(this.baseSrc + "memo-02.jpg");
    this.srcImages.push(this.baseSrc + "memo-04.jpg");
    this.srcImages.push(this.baseSrc + "memo-05.jpg");
  }

  validarTupla(){
    this.intentos ++;
    if(this.celdas[this.celda1] != this.celdas[this.celda2]){
      this.waitTime(1);
    }
    else{
      this.estado = 0;
      if(this.isGameOver()){
        this.habilitarInicio = true;
      }
    }    
  }

  clickCelda(celda:number){   
    this.juegoIniciado = true;     
    if(this.estado != 2){
      this.celdas[celda] = this.srcImages[celda];
      this.estado++;    

      switch(this.estado){
        case 1:
          this.celda1 = celda;
          break;
        case 2:
          this.celda2 = celda;
          this.validarTupla();          
          break;
      }
    }    
  }

  waitTime(seconds:number){
    setTimeout( () => { 
      this.celdas[this.celda1] = this.celdaCubierta;
      this.celdas[this.celda2] = this.celdaCubierta;
      this.estado = 0;
    }, seconds * 1000 );
  }

  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  isGameOver():boolean{
    let flagGameOver:boolean = true;
    
    for(let celda of this.celdas){
      if(celda == this.celdaCubierta){
        flagGameOver = false;
        break;
      }
    }

    return flagGameOver;
  }
}