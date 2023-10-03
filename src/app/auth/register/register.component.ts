import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorExists = false;
  errorText = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!this.userService.getUser(form.value.email)) {
      this.errorExists = false;
      let newUser = this.userService.registerUser(
        form.value.email,
        form.value.password,
        form.value.birthDate,
        form.value.name,
        form.value.surename,
        form.value.street,
        form.value.streetNumber,
        form.value.phone
      );
      this.router.navigate(['']);
    } else {
      this.errorExists = true;
      this.errorText = 'Greska prilikom registracije korisnika';
    }

    console.log(this.userService.getAllUsers());
  }
}
