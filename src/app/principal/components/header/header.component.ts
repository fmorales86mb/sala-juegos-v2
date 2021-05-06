import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string;

  constructor(private autService: AuthService, private router:Router, private userService:UsersService) { }

  ngOnInit(): void {
    this.userName = this.userService.currentUser.name;
    // if(this.userService.currentUser){
    //   this.userName = this.userService.currentUser.name;
    // }
    // else{
    //   this.userName = "Test";
    // }
  }

  clickLogout(){
    this.autService.Desloguearse();
    this.router.navigate(["login"]);
  }

  goToHome(){
    this.router.navigate(["home"]);
  }

  goToQuienSoy(){
    this.router.navigate(["quien-soy"]);
  }

  goToEncuesta(){
    this.router.navigate(["encuesta"]);
  }

  goToRegistro(juegoId:number){
    this.router.navigate(['resultados', { id: juegoId }]);
  }
}
