import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './auth/guards/authenticate.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", component: HomeComponent, canActivate:[AuthenticateGuard]},
  {path:"home", component: HomeComponent, canActivate:[AuthenticateGuard]},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }