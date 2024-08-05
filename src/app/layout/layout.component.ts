import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Component, inject, ViewEncapsulation } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatMenuModule, MatListModule, MatExpansionModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class LayoutComponent {
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)

  goToLogin() {
    this._router.navigate(['/'])
  }

  logout() {
    this._authService.signOut().subscribe(() => {
      this.goToLogin()
    })
  }
}
