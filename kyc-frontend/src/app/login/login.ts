import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {

  username = '';
  password = '';

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
