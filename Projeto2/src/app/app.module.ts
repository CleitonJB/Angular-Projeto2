import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Módulos do projeto
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//http para funcionar as requisições
//import { HttpClientModule } from '@angular/common/http';
//importaçao para formulários angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';               //formúlarios template driven  e reactive

//Services
import { AuthService } from './shared/services/auth_sc/auth.service';
import { ProdutoService } from './shared/services/produto_sc/produto.service';

//Verificação de erros
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,                  //formúlarios template driven
    ReactiveFormsModule,           // formulários reactive
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  providers: [
    AuthService, 
    ProdutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
