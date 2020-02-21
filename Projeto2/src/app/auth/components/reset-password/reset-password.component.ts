import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    console.log(f.valid);
  }

}
