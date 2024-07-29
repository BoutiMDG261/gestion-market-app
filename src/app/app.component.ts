import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from '@app/core/auth/auth.service';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  connected: Observable<boolean> | undefined

  private readonly _authService = inject(AuthService)

  ngOnInit(): void {
    this._authService.check().pipe(tap((authenticated) => {
      if (!authenticated) {
        return of(false);
      }
      return of(true);
    }))
  }
}
