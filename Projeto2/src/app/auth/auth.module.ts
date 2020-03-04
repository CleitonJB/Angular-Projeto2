import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProductsComponent } from './components/products/products.component';
//Angular material
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';   //Botões
import { MatListModule } from '@angular/material/list';       //Grid list

import { FormsModule, ReactiveFormsModule } from '@angular/forms';               //formúlarios template driven  e reactive           
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, ProductsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,                 //formúlarios template driven
    ReactiveFormsModule,          // formulários reactive 
    AuthRoutingModule,
    MatToolbarModule,           //Angular material
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,             //Botões
    MatListModule,               //Grid list
  ],
  exports: [
    LoginComponent, 
    RegisterComponent, 
    ResetPasswordComponent,
    ProductsComponent
  ]
})
export class AuthModule { }
