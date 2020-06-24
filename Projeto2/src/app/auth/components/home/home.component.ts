import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { User } from './../../../models/user.model';

import { AuthService } from './../../../shared/services/auth_sc/auth.service';
import { UserService } from './../../../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public currentUser;

  usuario = {} as User;
  users: User[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.currentUser = localStorage.getItem('currentUser')? JSON.parse(localStorage.getItem('currentUser')) : '';
    this.authService.logado = true;
  }

  ngOnInit() {
    this.getAll();
  }

  //Deslogar
  logout(){
    this.authService.logado = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  //Obter todos usuários cadastrados
  getAll(){
    this.userService.getAll().subscribe(user => this.users = user)
  }

  //Copiar o usuário selecionado para editá-lo
  copyUsuario(usuario: User){
    this.usuario = { ...usuario };
  }

  //Atualizar usuário
  updateUsuario(form: NgForm){
    this.userService.updateUsuario(this.usuario)
      .subscribe(
        (data) => {
          window.alert('Usuário atualizado com sucesso!');
          this.getAll();
        }
      );
  }

  limparForm(form: NgForm){
    form.reset();
  }

}