import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private autService: AuthService, private router:Router) { }

  ngOnInit(): void {
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
}
