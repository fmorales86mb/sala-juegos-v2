import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {

  perfil:string;
  srcJuegoPropio:string;
  srcBase:string = "../../../../assets/";

  constructor(private router:Router) { 
    this.perfil = this.srcBase + "perfil01.jpg";
    this.srcJuegoPropio = this.srcBase + "quema-coco-logo.jpg";
  }

  ngOnInit(): void {
  }

  goToJuegoPropio(){
    this.router.navigate(["quema-coco"]);
  }

}
