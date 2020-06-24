import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnOneComponent } from './layouts/column-one/column-one.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router'; //para o routerLink funcionar

import { MatToolbarModule } from '@angular/material/toolbar'; //Angular material
import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';               //formúlarios template driven  e reactive

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [ColumnOneComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,                  //formúlarios template driven
    ReactiveFormsModule,           // formulários reactive
    RouterModule,                 //para o routerLink funcionar
    MatToolbarModule,             //Angular material
    MatIconModule,
  ],
  exports: [
    ColumnOneComponent,
    FooterComponent,
  ]
})
export class SharedModule { }
