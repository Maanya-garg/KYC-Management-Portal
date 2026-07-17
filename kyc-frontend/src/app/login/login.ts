import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  username = '';
  password = '';
  showPassword = false;

  constructor(private router: Router) {}

  login() {

    if (!this.username) {
      alert("Username is required.");
      return;
    }

    if (!this.password) {
      alert("Password is required.");
      return;
    }

    if (this.username === "admin" && this.password === "admin123") {

      this.router.navigate(['/home']);

    } else {

      alert("Invalid username or password.");

    }

  }

}
