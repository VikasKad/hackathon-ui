import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService

  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });

  }
  login(): void {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
  }

}
