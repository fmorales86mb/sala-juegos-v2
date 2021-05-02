import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  showChat:boolean;
  constructor() { 
    this.showChat =false;
  }

  ngOnInit(): void {
  }

  togleChat(){
    this.showChat = !this.showChat;
  }
}
