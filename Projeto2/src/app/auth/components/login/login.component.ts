import { Component, OnInit } from '@angular/core';
//meus imports
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../../shared/services/auth_sc/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  logado = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      OPER_login: ['', Validators.required],
      OPER_senha: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  //atalho para acessar os campos do formulario
  get fval() { return this.loginForm.controls; }

  onFormSubmit(){
    this.submitted = true;

    //se formulario invalido retorna para o mesmo
    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;
    this.authService.login(this.fval.OPER_login.value, this.fval.OPER_senha.value)
      .pipe(first())
        .subscribe(
          data => {
            if(data !== 'eof'){
              console.log('logado: ', data);
              this.authService.logado = true;
              this.router.navigate([this.returnUrl]);
            }else{
              this.error = 'Usuário não encontrado';
              console.log('erro: ', data);
              this.authService.logado = false;
              this.router.navigate(['/login']);
            }
          },
          error => {
            this.error = 'Server: ' +error;
            this.loading = false;
            window.alert('Erro ao conectar com o servidor');
          });
  }
}
