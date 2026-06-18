import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loading = false;
  errorMessage = '';
  hidePassword = true;

  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { email, password } = this.form.getRawValue();

    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.loading = false;
        const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/noticias';
        this.router.navigateByUrl(redirectTo);
      },
      error: (err: Error) => {
        this.loading = false;
        this.errorMessage = err.message;
      },
    });
  }
}
