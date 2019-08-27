import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username;
  password;
  error = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.error = false;
      this.router.navigate(['/main']);
    } else {
      this.error = true;
    }
  }

}
