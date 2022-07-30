import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
