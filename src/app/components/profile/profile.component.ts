import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { concatMap, switchMap, tap } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private authService: AuthenticationService, private toast: HotToastService, private imageUploadService: ImageUploadService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(
      untilDestroyed(this)
    ).subscribe((user) =>{
      this.profileForm.patchValue({ ...user })
    })
  }

  get displayName() {
    return this.profileForm.get('displayName')
  }

  uploadImage(event: any, user: ProfileUser) {
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe({
        loading: 'Subiendo imagen...',
        success: 'Imagen actualizada',
        error: 'A ocurriodo un error al subir la imagen'
      }),
      concatMap((photoURL) => this.usersService.updateUser({ uid: user.uid ,photoURL }))
    ).subscribe()
  }

  saveProfile(){
    const profileData = this.profileForm.value;
    this.usersService.updateUser(profileData).pipe(
      this.toast.observe({
        loading: 'Actualizando perfil...',
        success: 'Perfil actualizado',
        error: 'A ocurrido un error al editar el perfil'
      })
    ).subscribe()
  }

}
