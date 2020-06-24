import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//import { ToastrModule } from 'ngx-toastr';

//Métodos HTTP | Verificação de erros
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Módulos do projeto
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//importaçao para formulários angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';               //formúlarios template driven  e reactive

//Services
import { ProdutoService } from './shared/services/produto_sc/produto.service';
import { AuthService } from './shared/services/auth_sc/auth.service';

//Autorização
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor  } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,                  //formúlarios template driven
    ReactiveFormsModule,           // formulários reactive
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    //ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ProdutoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
