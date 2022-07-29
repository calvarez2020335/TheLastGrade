import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(private authService: AuthenticationService, private toast: HotToastService, private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }

  uploadImage(event: any, user: User) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading: 'Subiendo imagen...',
        success: 'Imagen actualizada',
        error: 'A ocurriodo un error al subir la imagen'
      }),
      concatMap((photoURL) => this.authService.updateProfileData({ photoURL }))
    ).subscribe()
  }

}
