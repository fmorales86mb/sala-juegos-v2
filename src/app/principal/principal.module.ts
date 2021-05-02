import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalRoutingModule } from './principal-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { PiedraPapelTijeraComponent } from './pages/piedra-papel-tijera/piedra-papel-tijera.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { ChatModule } from '../chat/chat.module';
import { TatetiComponent } from './pages/tateti/tateti.component';


@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    QuienSoyComponent,
    PiedraPapelTijeraComponent,
    GameCardComponent,
    TatetiComponent
  ],
  imports: [
    ChatModule,
    CommonModule,
    PrincipalRoutingModule
  ]
})
export class PrincipalModule { }
