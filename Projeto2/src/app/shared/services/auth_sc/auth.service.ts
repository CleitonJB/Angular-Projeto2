import { Injectable } from '@angular/core';

//meus imports
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://vcmobile.com.br/VictorProjetoEstagio/Hackathon/WebApi/V01';
  headers = new HttpHeaders().set('Content-Type', 'application/json');  
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}
 
  // Sign-up (Cadastro)
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/Operadores_Incluir_Post`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in (Login)
  signIn(user: User) {
    return this.http.post<any>(`${this.endpoint}/Operadores_ValidarLogin_Post`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        })
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }
  
  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Error manager
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }

}
