import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '@app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  signInForm!: UntypedFormGroup
  formSubmitted = false

  private readonly _formBuilder = inject(UntypedFormBuilder)
  private readonly _authService = inject(AuthService)
  private readonly _snackBar = inject(MatSnackBar)
  private readonly _router = inject(Router)

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  goToHome() {
    this._router.navigate(['/home'])
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.signInForm) {
      if (this.signInForm.invalid) {
        return
      }

      this.signInForm.disable()

      this._authService.signIn(this.signInForm.value).subscribe({
        next: () => {
          this.signInForm.enable()
          this._snackBar.open('Bievenu à vous!', 'Fermer', { duration: 3000, panelClass: ['success-snackbar', 'snackbar-top'] })
        },
        error: () => {
          this.signInForm.enable()
        },
        complete: () => {
          this.signInForm.enable()
          this.goToHome()
        }
      })
    }
  }
}
