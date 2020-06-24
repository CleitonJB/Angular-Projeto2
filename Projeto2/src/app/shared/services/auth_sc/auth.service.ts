import { Injectable } from '@angular/core';
//meus imports
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  logado = false;

  baseUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01";
  //lgUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_ValidarLogin_Post";
  //rgUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_Incluir_Post";

  //Header
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control' : 'private'
    }) 
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(OPER_login: string, OPER_senha: string){
    return this.http.post<any>(`${this.baseUrl}/Operadores_ValidarLogin_Post`, { OPER_login, OPER_senha })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
    //colocar para logado receber false e no login para receber true
    // remove user from local storage to log user out
    console.log(this.currentUserValue);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
