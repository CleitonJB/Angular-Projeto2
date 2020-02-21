import { Component, OnInit } from '@angular/core';

//meus imports
import { AuthService } from 'src/app/shared/services/auth_sc/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) { 
    this.signinForm = this.fb.group({
      OPER_login: [''],
      OPER_senha: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    this.authService.signIn(this.signinForm.value)
  }
}
