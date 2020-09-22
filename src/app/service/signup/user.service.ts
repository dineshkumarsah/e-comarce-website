import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "http://localhost/api/users/signup"
  loginUrl = "http://localhost/api/users/login"

  constructor(private http: HttpClient) { }

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
        return <loginResponse>res
      })
    )
  }
}
interface loginResponse{
  message: string;
  token: string
}