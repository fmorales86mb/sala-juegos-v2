import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from '../auth/guards/authenticate.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HomeComponent } from './pages/home/home.component';
import { MemotestComponent } from './pages/memotest/memotest.component';
import { PiedraPapelTijeraComponent } from './pages/piedra-papel-tijera/piedra-papel-tijera.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { TatetiComponent } from './pages/tateti/tateti.component';

const routesProd: Routes = [
  {path:"", component:HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"home", component:HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"piedra-papel-tijera", component:PiedraPapelTijeraComponent, canActivate:[AuthenticateGuard]},
  {path:"quien-soy", component:QuienSoyComponent, canActivate:[AuthenticateGuard]},
  {path:"tateti", component:TatetiComponent, canActivate:[AuthenticateGuard]},
  {path:"memotest", component:MemotestComponent, canActivate:[AuthenticateGuard]},
  {path:"encuesta", component:EncuestaComponent, canActivate:[AuthenticateGuard]}
];

const routesTest: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"piedra-papel-tijera", component:PiedraPapelTijeraComponent},
  {path:"quien-soy", component:QuienSoyComponent},
  {path:"tateti", component:TatetiComponent},
  {path:"memotest", component:MemotestComponent},
  {path:"encuesta", component:EncuestaComponent}
];

//const routes: Routes = routesProd;
const routes: Routes = routesTest;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
