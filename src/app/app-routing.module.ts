import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './auth/guards/authenticate.guard';
import { HomeComponent } from './pages/home/home.component';
import { PiedraPapelTijeraComponent } from './pages/piedra-papel-tijera/piedra-papel-tijera.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';

const routes: Routes = [
  {path:"", component: HomeComponent, canActivate:[AuthenticateGuard]},
  //{path:"", component: HomeComponent},
  {path:"home", component: HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"piedra-papel-tijera", component:PiedraPapelTijeraComponent, canActivate:[AuthenticateGuard]},
  {path:"quien-soy", component:QuienSoyComponent, canActivate:[AuthenticateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
