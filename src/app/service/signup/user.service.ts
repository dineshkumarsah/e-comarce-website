import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost/api/users/signup"
  loginUrl = "http://localhost/api/users/login"
  isAdminUrl = "http://localhost/api/users/is-admin"
  private _loginObservable: BehaviorSubject<Object>

  constructor(private http: HttpClient) {
    this._loginObservable = new BehaviorSubject({})
   }



   get loginObservable(){
     return this._loginObservable
   }

   isAdmin(){
     let headers = new HttpHeaders({
       'authorization': this.getToken()
     });

     return this.http.get(this.isAdminUrl,{headers}).pipe(
       map((res)=>{
         return <boolean> res
       })
     )
   }
   logOut(){
     localStorage.removeItem('token');
     this._loginObservable.next({});
   }

  saveToken(token: string){
   localStorage.setItem("token","Bearer "+token)
  }
  getToken(){
    return localStorage.getItem("token")? localStorage.getItem("token"):""
  }
  signUp(user: User) {
    return this.http.post(this.baseUrl, user).pipe(
      map(
        (res) => {
          return <{ message: string }>res
        }
      )
    )
  }
  login(credential: { "email": string, "password": string }) {
    return this.http.post(this.loginUrl, credential).pipe(
      map((res: loginResponse)=>{
        this.saveToken(res.token)
        this._loginObservable.next({})
        return <loginResponse>res
      })
    )
  }
}
interface loginResponse{
  message: string;
  token: string
}