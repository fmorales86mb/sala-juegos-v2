import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from '../auth/guards/authenticate.guard';
import { GuardaPartidaGuard } from './guards/guarda-partida.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HomeComponent } from './pages/home/home.component';
import { MemotestComponent } from './pages/memotest/memotest.component';
import { PiedraPapelTijeraComponent } from './pages/piedra-papel-tijera/piedra-papel-tijera.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { TatetiComponent } from './pages/tateti/tateti.component';

const routesProd: Routes = [
  {path:"", component:HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"home", component:HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"piedra-papel-tijera", component:PiedraPapelTijeraComponent, canActivate:[AuthenticateGuard], canDeactivate:[GuardaPartidaGuard]},
  {path:"quien-soy", component:QuienSoyComponent, canActivate:[AuthenticateGuard]},
  {path:"tateti", component:TatetiComponent, canActivate:[AuthenticateGuard], canDeactivate:[GuardaPartidaGuard]},
  {path:"memotest", component:MemotestComponent, canActivate:[AuthenticateGuard], canDeactivate:[GuardaPartidaGuard]},
  {path:"encuesta", component:EncuestaComponent, canActivate:[AuthenticateGuard]},
  {path:"resultados", component:ResultadosComponent, canActivate:[AuthenticateGuard]}
];

const routesTest: Routes = [
  {path:"", component:HomeComponent},
  {path:"home", component:HomeComponent},
  {path:"piedra-papel-tijera", component:PiedraPapelTijeraComponent, canDeactivate:[GuardaPartidaGuard]},
  {path:"quien-soy", component:QuienSoyComponent},
  {path:"tateti", component:TatetiComponent, canDeactivate:[GuardaPartidaGuard]},
  {path:"memotest", component:MemotestComponent, canDeactivate:[GuardaPartidaGuard]},
  {path:"encuesta", component:EncuestaComponent},
  {path:"resultados", component:ResultadosComponent}
];

const routes: Routes = routesTest;
// const routes: Routes = routesTest;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
