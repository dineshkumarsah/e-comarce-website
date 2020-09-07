import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl="http://localhost/api/users/signup"

  constructor(private http: HttpClient) { }


  signUp(user: User){
    return this.http.post(this.baseUrl,user)
  }
}
