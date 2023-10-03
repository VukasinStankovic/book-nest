import { Component, Inject } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isEditing: boolean = false;
  profileForInput!: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.profileForInput = {
      id: this.data.user.id,
      name: this.data.user.name,
      surename: this.data.user.surename,
      email: this.data.user.email,
      birthDate: this.data.user.date,
      password: this.data.user.password,
      street: this.data.user.street,
      streetNumber: this.data.user.streetNumber,
      phone: this.data.user.phone,
    };
  }

  finishEditing(form: NgForm) {
    this.data.user.email = this.profileForInput.email;
    this.data.user.password = this.profileForInput.password;
    this.data.user.address = this.profileForInput.street;
    this.data.user.phone = this.profileForInput.phone;
    this.isEditing = true;
  }
}
