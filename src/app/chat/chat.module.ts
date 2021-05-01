import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { WindowComponent } from './component/window/window.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../auth/services/users.service';


@NgModule({
  declarations: [
    WindowComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    WindowComponent
  ]
})
export class ChatModule { }
