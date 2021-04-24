import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthenticateGuard } from './guards/no-authenticate.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
   {path:'login', component:LoginComponent, canActivate:[NoAuthenticateGuard]},
   {path:'register', component:RegisterComponent, canActivate:[NoAuthenticateGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
