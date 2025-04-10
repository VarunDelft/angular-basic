import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    const validUser = this.email === 'test@example.com' && this.password === 'password123';

    if (validUser) {
      const username = this.email.split('@')[0]; // Extract "test" from "test@example.com"
      this.router.navigate(['/welcome', username]);
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }
}