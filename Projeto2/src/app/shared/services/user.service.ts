import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //Header
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control' : 'no-cache',
    }) 
  };

  gtUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_SelecionarTodos_Get";
  rgUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_Incluir_Post";
  edUrl = "http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01/Operadores_Alterar_Post";

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<User[]>(this.gtUrl);
  }

  register(usuario){
    return this.http.post<any>(this.rgUrl, JSON.stringify(usuario), this.httpOption);
  }

  updateUsuario(usuario: User): Observable<User> {
    return this.http.post<User>(this.edUrl, JSON.stringify(usuario), this.httpOption);
  }
}
