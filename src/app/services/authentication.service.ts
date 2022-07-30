import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, UserInfo } from '@angular/fire/auth';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: Auth) { }

  currentUser$ = authState(this.auth);

  login(username: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) =>{
        if(!user) throw new Error("No autenticado");

        return updateProfile(user, profileData);
      })
    )

  }

  logout(){
    return from(this.auth.signOut())
  }

}
