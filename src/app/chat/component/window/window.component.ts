import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/auth/services/users.service';
import { Message } from '../../models/message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit {

  public chatForm: FormGroup;
  mensaje:string;
  mensajes:Message[];
  @ViewChild('salachat', { static: true }) private chatDiv: any;
  showSpinner:boolean;
  
  constructor(private mjeService: ChatService, private userService:UsersService, private fb:FormBuilder) {     
    this.showSpinner = true;  
    
    this.mjeService.items.subscribe(
      (mje)=>{        
        this.mensajes = mje;
        this.showSpinner = false;
        this.scrollToBottom();
      }
    );  
  }

  enviarMje(){       
    let mje = new Message();
    mje.message = this.mensaje;  
    mje.userName = this.userService.currentUser.name;
    mje.userEmail = this.userService.currentUser.email;            
    mje.fecha = Date.now();      

    this.mjeService.setItemWithId(mje, mje.fecha.toString());    

    this.mensaje = "";
  }

  scrollToBottom(): void {
    try {
      console.log(this.chatDiv.nativeElement.scrollTop, this.chatDiv.nativeElement.scrollHeight);
        this.chatDiv.nativeElement.scrollTop = 300;
        
    } catch(err) { 
    //  console.log("error: ", err) 
    } 
  }

  getMessageCtrl(){
    return this.chatForm.get("messageCtrl");
  }

  ngOnInit(): void {

    this.chatForm = this.fb.group({
      messageCtrl:['', [Validators.required, Validators.maxLength(50)]],      
    });    
        
    this.scrollToBottom();
  }
}
