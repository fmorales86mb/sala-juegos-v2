import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardDto } from 'src/app/models/card-dto';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() data:CardDto;
  imgSrc:string;

  constructor(private router:Router) {

  }

  ngOnInit(): void {
    this.imgSrc = "../../../assets/" + this.data.img;
  }

  goToGame(){
    this.router.navigate([this.data.href]); 
  }

}
