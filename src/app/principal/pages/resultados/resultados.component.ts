import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/auth/services/users.service';
import { RegistroJuego } from '../../models/registro-juego';
import { RegistroService } from '../../services/registro.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  
  id:Observable<number>;
  showSpinner:boolean;
  userEmail:string;
  registros:RegistroJuego[];
  juego:string;

  constructor(private route: ActivatedRoute, private registroService: RegistroService, private userService:UsersService) { 
    this.showSpinner = true;
    this.id = this.route.params.pipe(map(p => p.id));
    this.userEmail = this.userService.currentUser?this.userService.currentUser.email:"test@email.com";
    this.registroService.setCollection("registro-"+this.userEmail);
    this.juego = "";
  }

  ngOnInit(): void {
    this.id.subscribe((id)=>{
      console.log(id);
      this.setJuego(id);
      this.getRegistros(id,this.userEmail);
    });
  }  
  setJuego(id:number){

    switch(id){
      case 1:
        this.juego = "Piedra, Papel o Tijera";
        break;
      case 2:
        this.juego = "Ta-Te-Ti";
        break;
      case 3:
        this.juego = "Memotest";
        break;
      case 4:
        this.juego = "Juego Propio";
        break;
    }
    console.log("id: "+ id + " juego: "+ this.juego);
  }

  getRegistros(juegoId:number, email:string){
    this.registroService.items.subscribe((items)=>{
      this.registros = items.filter((value)=>{
        return value.juegoId == juegoId;
      });
      this.showSpinner = false;
    });
  }


}
