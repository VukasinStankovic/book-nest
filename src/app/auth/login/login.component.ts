import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorExists = false;
  errorText = '';

  constructor(private _userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    let user = this._userService.getUser(email);

    if (!user) {
      this.errorExists = true;
      this.errorText =
        'Korisnik sa e-mail adresom ' +
        email +
        ' ne postoji. Registrujte novi nalog';
      return;
    }

    let isPasswordValid = this._userService.isLoginParametersCorrect(
      email,
      password
    );
    if (!isPasswordValid) {
      this.errorExists = true;
      this.errorText = 'Pogrešno ste uneli korisničko ime ili lozinku';
      return;
    }
    this.errorExists = false;
    this.router.navigate(['']);
  }
}
