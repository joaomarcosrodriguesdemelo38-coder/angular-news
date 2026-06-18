import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

function passwordsMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };
}

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  loading = false;
  errorMessage = '';
  hidePassword = true;

  form: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordsMatchValidator() },
    );
  }

  get name() {
    return this.form.get('name')!;
  }
  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    const { name, email, password } = this.form.getRawValue();

    this.auth.register(name!, email!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/noticias']);
      },
      error: (err: Error) => {
        this.loading = false;
        this.errorMessage = err.message;
      },
    });
  }
}
