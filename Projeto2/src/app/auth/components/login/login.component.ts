import { Component, OnInit } from '@angular/core';
//meus imports
import { AuthService } from 'src/app/shared/services/auth_sc/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    // redirect to home if already logged in
    if(this.authService.currentUserValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      OPER_login: ['', Validators.required],
      OPER_senha: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return  this.loginForm.controls; }

  onSubmit(){
    // stop here if form is invalid
    if(this.loginForm.invalid){
      return;
    }

    this.authService.loginUser(this.f.OPER_login.value, this.f.OPER_senha.value).pipe(
      first()).subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
        }
      );
  }

  /*
  {
    "OPER_login": "ADM",
    "OPER_senha": 123456,
  }

  {
    "OPER_login": "AMARO",
    "OPER_senha": 123456,
  }
  */
}
