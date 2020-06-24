import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //registerForm: FormGroup;

  registerForm = 
  {
    OPER_seq_oper: null,
    OPER_login: null,
    OPER_senha: null,
    OPER_nome_operador: null,
    cod_oper_inc: 0,
    dat_inclusao: null,
    cod_oper_alt: 0,
    dat_alteracao: null,
  } as User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() { 
    this.registerForm.OPER_seq_oper = null;
    this.registerForm.OPER_login = '';
    this.registerForm.OPER_senha = '';
    this.registerForm.OPER_nome_operador = '';
    this.registerForm.cod_oper_inc = 0;
    this.registerForm.dat_inclusao = null;
    this.registerForm.cod_oper_alt = 0;
    this.registerForm.dat_alteracao = null;
    /*this.registerForm = this.formBuilder.group({
      OPER_login: ['', Validators.required],
      OPER_senha: ['', Validators.required]
    });*/
  }
    
  onFormSubmit() {
    //Retornar para o formulario se o mesmo for invalido
    /*if(this.registerForm.invalid){
      return;
    }*/

    this.userService.register(this.registerForm)
      .subscribe((res) => {
        if(res == 'ok'){
          this.router.navigate(['/login']);
        }else{
          window.alert('Algo de errado ocorreu, tente novamente');
        }
        console.log('Resposta do server: ', res);
      },
      (error) =>{
        window.alert('Erro ao cadastrar usuário...');
      });
  }
}
