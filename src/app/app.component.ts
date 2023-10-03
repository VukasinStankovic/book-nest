import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './auth/profile/profile.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { CartOrderService } from './cart/cart-order.service';
import { User } from './auth/user.model';

//
@Component({
  selector: 'app-root',
  // putanja ka templejtu glavne komponente
  templateUrl: './app.component.html',
  // putanja ka css stilovima glavne komponente
  styleUrls: ['./app.component.css'],
})
// Programska logika korene komponente
export class AppComponent implements OnInit {
  title = 'online-book-store';
  profileOpened!: boolean;
  cartOpened!: boolean;
  registerDialogOpened!: boolean;

  constructor(
    public _userService: UserService,
    public _cartOrderService: CartOrderService,
    private profileDialog: MatDialog,
    private cartDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._userService.getAllUsers();
  }

  // TODO: naci bolje resenje
  countBooks(): number {
    return this._cartOrderService.countBooksInCurrentCart();
  }

  // Profile
  openProfile(userId: number) {
    this.profileOpened = true;

    const profileDialog = this.profileDialog.open(ProfileComponent, {
      disableClose: false,
      width: '30vw',
      data: {
        user: this._userService.getUserById(userId),
      },
    });

    profileDialog.afterClosed().subscribe((result) => {
      this.profileOpened = true;
    });
  }

  // Cart
  openCart(userId: number) {
    this.cartOpened = true;

    const cartDialog = this.cartDialog.open(CartComponent, {
      disableClose: true,
      width: '50vw',
      data: {
        user: this._userService.getUserById(userId),
      },
    });
  }

  logOut() {
    this._userService.logOutUser();
  }
}
