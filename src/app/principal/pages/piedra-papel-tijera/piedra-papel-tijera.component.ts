import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';

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
  userName:string;

  constructor(private userService:UsersService) { 
    this.triunfos = 0;
    this.derrotas = 0;
    this.setInitialStatus();
  }

  ngOnInit(): void {
    if(this.userService.currentUser){
      this.userName = this.userService.currentUser.name;
    }
    else{
      this.userName = "Test";
    }
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

    console.log("humano: ", id, " maquina: ", maquina);

    this.waitTime(seconds);
  }

  getResultado(humano:number, maquina:number):number{
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
  
}
