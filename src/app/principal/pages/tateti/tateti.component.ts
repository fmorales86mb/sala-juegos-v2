import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { TatetiCelda } from '../../models/tateti-celda';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.scss']
})
export class TatetiComponent implements OnInit {

  srcCruz:string;
  srcCirculo:string;
  celda11:TatetiCelda;
  celda12:TatetiCelda;
  celda13:TatetiCelda;
  celda21:TatetiCelda;
  celda22:TatetiCelda;
  celda23:TatetiCelda;
  celda31:TatetiCelda;
  celda32:TatetiCelda;
  celda33:TatetiCelda;
  turnoHumano:boolean;
  triunfos:number;
  derrotas:number;
  userName:string;

  constructor(private userService:UsersService) { 
    this.turnoHumano = true;
    this.srcCruz = "../../../../assets/tateti-cruz.jpg";
    this.srcCirculo = "../../../../assets/tateti-circulo.jpg";
    this.triunfos = 0;
    this.derrotas = 0;
    this.initCeldas();
  }

  ngOnInit(): void {
    if(this.userService.currentUser){
      this.userName = this.userService.currentUser.name;
    }
    else{
      this.userName = "Test";
    }
  }

  initCeldas(){
    this.celda11 = new TatetiCelda();
    this.celda12 = new TatetiCelda();
    this.celda13 = new TatetiCelda();
    this.celda21 = new TatetiCelda();
    this.celda22 = new TatetiCelda();
    this.celda23 = new TatetiCelda();
    this.celda31 = new TatetiCelda();
    this.celda32 = new TatetiCelda();
    this.celda33 = new TatetiCelda();

    this.celda11.imgSrc = "";
    this.celda12.imgSrc = "";
    this.celda13.imgSrc = "";
    this.celda21.imgSrc = "";
    this.celda22.imgSrc = "";
    this.celda23.imgSrc = "";
    this.celda31.imgSrc = "";
    this.celda32.imgSrc = "";
    this.celda33.imgSrc = "";

    this.celda11.nroCelda = 1;
    this.celda12.nroCelda = 2;
    this.celda13.nroCelda = 3;
    this.celda21.nroCelda = 4;
    this.celda22.nroCelda = 5;
    this.celda23.nroCelda = 6;
    this.celda31.nroCelda = 7;
    this.celda32.nroCelda = 8;
    this.celda33.nroCelda = 9;
  }

  clickHumano(celda:number){
    if(this.turnoHumano){
      if (this.checkCel(celda, true)){
        if(!this.verificarResultado(true)){
          this.turnoHumano = false;
          this.waitTime(1);
        }
      };
    }
  }

  checkCel(celda:number, humano:boolean):boolean{
    let check:boolean = false;
    switch(celda){
      case 1:
        if(!this.celda11.isCheck){
          this.celda11.imgSrc = humano? this.srcCirculo: this.srcCruz;
          this.celda11.isCheck = true;
          this.celda11.isHuman = humano;
          check = true;
        }
        break;
      case 2:
        if(!this.celda12.isCheck){
        this.celda12.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda12.isCheck = true;
        this.celda12.isHuman = humano;
        check = true;
        }
        break;
      case 3:
        if(!this.celda13.isCheck){
        this.celda13.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda13.isCheck = true;
        this.celda13.isHuman = humano;
        check = true;
        }
        break;
      case 4:
        if(!this.celda21.isCheck){
        this.celda21.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda21.isCheck = true;
        this.celda21.isHuman = humano;
        check = true;
        }
        break;
      case 5:
        if(!this.celda22.isCheck){
        this.celda22.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda22.isCheck = true;
        this.celda22.isHuman = humano;
        check = true;
        }
        break;
      case 6:
        if(!this.celda23.isCheck){
        this.celda23.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda23.isCheck = true;
        this.celda23.isHuman = humano;
        check = true;
        }
        break;
      case 7:
        if(!this.celda31.isCheck){
        this.celda31.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda31.isCheck = true;
        this.celda31.isHuman = humano;
        check = true;
        }
        break;
      case 8:
        if(!this.celda32.isCheck){
        this.celda32.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda32.isCheck = true;
        this.celda32.isHuman = humano;
        check = true;
        }
        break;
      case 9:
        if(!this.celda33.isCheck){
        this.celda33.imgSrc = humano? this.srcCirculo: this.srcCruz;
        this.celda33.isCheck = true;
        this.celda33.isHuman = humano;
        check = true;
        }
        break;
    }

    return check;
  }

  checkMachine(){
    if(this.isGameOver()){
      console.log("isGameOver");
      this.initCeldas();
    }
    else{
      let check:boolean = false;
      
      while(!check){
        let option = this.getRandomInt(1, 9);
        check = this.checkCel(option, false);
      }
    }

    this.verificarResultado(false);
    
    this.turnoHumano = true;
  }

  verificarResultado(humano:boolean):boolean{
    let resultado = false;

    if(this.validarTrio(this.celda11, this.celda12, this.celda13, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda11, this.celda22, this.celda33, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda11, this.celda21, this.celda31, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda12, this.celda22, this.celda32, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda13, this.celda23, this.celda33, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda21, this.celda22, this.celda23, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda31, this.celda32, this.celda33, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }
    else if(this.validarTrio(this.celda31, this.celda22, this.celda13, humano)){
      this.waitTimeEnd(2);
      resultado = true;
    }

    return resultado;
  }

  isGameOver():boolean{
    let gameOver = false;

    if(this.celda11.isCheck &&
      this.celda12.isCheck &&
      this.celda13.isCheck &&
      this.celda21.isCheck &&
      this.celda22.isCheck &&
      this.celda23.isCheck &&
      this.celda31.isCheck &&
      this.celda32.isCheck &&
      this.celda33.isCheck 
      ){
        gameOver = true;
      }

      return gameOver;
  }

  validarTrio(celda1:TatetiCelda, celda2:TatetiCelda, celda3:TatetiCelda, humano:boolean){
    let resultado = false;
    if(celda1.isCheck && celda2.isCheck && celda3.isCheck){
      if(celda1.isHuman == humano && celda2.isHuman == humano && celda3.isHuman == humano){
        console.log(celda1, celda2, celda3);
        if(humano){
          this.triunfos++;
        }
        else{
          this.derrotas++;
        }
        resultado = true;
      }
    }

    return resultado;
  }

  waitTime(seconds:number){
    setTimeout( () => { 
      this.checkMachine();
    }, seconds*1000 );
  }

  waitTimeEnd(seconds:number){
    setTimeout( () => { 
      this.initCeldas();
    }, seconds*1000 );
  }

  getRandomInt(min, max) : number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }
}
