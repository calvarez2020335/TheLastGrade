import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  constructor(private authService: AuthenticationService, private toast: HotToastService, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().pipe(
      this.toast.observe({
        loading: 'Cerrando sesión...',
        success: 'Sesión cerrada',
        error: 'A ocurrido un error al cerrar sesión'
      })
    ).subscribe(()=>{
      this.router.navigate([''])
    })
  }

}
