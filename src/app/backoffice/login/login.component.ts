import { Component } from '@angular/core';
    import { Router, RouterModule } from '@angular/router';
    import { FormsModule } from '@angular/forms';
    import { CommonModule } from '@angular/common'; // From previous fix
import { AuthService } from '../service/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

    @Component({
      selector: 'app-login',
      standalone: true,
      imports: [FormsModule, CommonModule ,ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule],
      
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.scss'] // Updated to .scss
      
    })
    
    export class LoginComponent {
      email: string = '';
      password: string = '';
      errorMessage: string = '';

      constructor(private authService: AuthService, private router: Router) {}

      onSubmit(): void {
        this.authService.login(this.email, this.password).subscribe({
          next: (res) => {

            localStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['/backoffice/patient']);
          },
          error: (err) => {
            this.errorMessage = 'Login failed. Please try again.';
            console.error(err);
          }
        });
      }
      
    }