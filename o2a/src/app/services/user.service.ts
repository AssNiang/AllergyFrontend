import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:5000/api/user';

  constructor(private http: HttpClient) { }

  signUpUser(user: User): Observable<any>{
    return this.http.post(this.baseUrl + '/register', user);
  }

  signInUser(infos: any): Observable<any>{
    return this.http.post(this.baseUrl + '/login', infos);
  }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+'/');
  }

  getUserById(id:string):Observable<User>{
    return this.http.get<User>(this.baseUrl+'/'+id);
  }

  updateUser(user:User){
    return this.http.put(this.baseUrl+'/'+user._id, user);
  }

  deleteUser(id:string){
    return this.http.delete(this.baseUrl + '/delete/'+id);
  }


}
