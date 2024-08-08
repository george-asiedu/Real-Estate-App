import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '../../validators/nameValidator';
import { emailValidator } from '../../validators/emailValidator';
import { passwordValidator } from '../../validators/passwordValidator';
import { Register } from '../../interface/register';
import { AuthService } from '../service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  public registerForm: FormGroup
  public showPassword: boolean = false
  public loading: boolean = false

  constructor(
    private fb: FormBuilder, 
    private spinner: NgxSpinnerService,
    private toast: NgToastService,
    private authService: AuthService) {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, nameValidator()]],
      last_name: ['', [Validators.required, nameValidator()]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', [Validators.required, passwordValidator()]],
      additional_properties: this.fb.group({
        address: this.fb.group({
          city: ['', [Validators.required, nameValidator()]]
        })
      })
    })
  }

  onRegisterSubmit(): void {
    if(this.registerForm.invalid) {
      return
    }

    this.loading = true
    this.spinner.show()
    const formData: Register = this.registerForm.value

    this.authService.register(formData).subscribe({
      next: (response) => {
        this.loading = false
        this.toast.success(response.message, 'Success', 3000)
        this.registerForm.reset()
        setTimeout(() => {
          this.spinner.hide()
        }, 2000)
        console.log('response',response)
      },
      error: (err) => {
        this.loading = false
        this.toast.danger(err.error?.message, 'Error', 3000)
        this.spinner.hide()
        console.error('error', err)
      }
    })
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword
    console.log('Password visibility toggled:', this.showPassword);
  }
}