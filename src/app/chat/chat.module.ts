import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { WindowComponent } from './component/window/window.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WindowComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule
  ],
  exports:[
    WindowComponent
  ]
})
export class ChatModule { }
