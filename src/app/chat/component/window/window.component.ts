import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  mensaje:string;
  constructor(private mjeService: ChatService, private userService:UsersService) { }

  enviarMje(){
    let mje = new Message();
    mje.message = this.mensaje;
    mje.userName = this.userService.currentUser.name;
    console.log(mje);
    this.mjeService.addItem(mje);
  }

  ngOnInit(): void {
  }

}
