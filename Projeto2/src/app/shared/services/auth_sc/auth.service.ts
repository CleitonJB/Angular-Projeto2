import { Injectable } from '@angular/core';

//meus imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  //Header
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*', 
      //'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE', 
      //'Access-Control-Allow-Headers': '*',
    }) 
  };

 loginUrl = 'http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_ValidarLogin_Post';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }
 
  loginUser(OPER_login: string, OPER_senha: string) {
    return this.http.post<any>(this.loginUrl, { OPER_login, OPER_senha }, this.httpOption).pipe(map(user => {
      // login successful if there's a jwt token in the response
      if(user && user.token){
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }

  logout(){
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  //Gerenciador de erros

}
