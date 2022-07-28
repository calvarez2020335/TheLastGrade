import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { JuegoComponent } from './components/juego/juego.component';
import { TablaComponent } from './components/tabla/tabla.component'
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard'

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['juego']);

const routes: Routes = [
  {path: '',  pathMatch: 'full', component: HomeComponent},
  {path: 'login', component: LoginComponent, ...canActivate(redirectToHome)},
  {path: 'registro', component: RegistroComponent, ...canActivate(redirectToHome)},
  {path: 'juego', component: JuegoComponent, ...canActivate(redirectToLogin)},
  {path: 'tabla', component: TablaComponent, ...canActivate(redirectToLogin)},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
