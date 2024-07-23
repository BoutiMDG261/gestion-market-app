import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)

  goToLogin() {
    this._router.navigate(['/'])
  }

  logout() {
    this._authService.signOut()
    this.goToLogin()
  }
}
