import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide = true;
  btnDisabled: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login(event: Event) {
    event.preventDefault;
    this.btnDisabled = true;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          setTimeout(() => {
            this.btnDisabled = false;
          }, 1500);
          this.router.navigateByUrl('home');
        },
        error: (err: HttpErrorResponse) => {
          this.btnDisabled = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email or password incorrect!',
          })
        }
      })
    }
  }
}

