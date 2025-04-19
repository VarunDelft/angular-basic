import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {

    this.authService.login({ email: this.email, password: this.password })
    .subscribe({
      next: (response) => {
        // Store the token in local storage or a service
        localStorage.setItem('token', response.token || '');
        // Navigate to the dashboard or home page
        this.router.navigate(['/welcome', response.username]);
      }
      , error: (error: HttpErrorResponse) => {
        // Handle HTTP error
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 500) {
          this.errorMessage = 'Server error, please try again later';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
    }
    );
  }

}