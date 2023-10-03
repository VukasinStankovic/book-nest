import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CartOrderService } from './cart-order.service';
import { Book } from '../books/book.model';
import { CartOrder, OrderStatus, PaymentMethod } from './cart-order.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../auth/user.service';
import { User } from '../auth/user.model';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, AfterViewInit {
  orderedBooks = new MatTableDataSource<Book>();
  displayedColumns = [
    'image',
    'title',
    'price',
    'orderedQuantity',
    'Međuzbir',
    'Akcije',
  ];
  order!: CartOrder;
  isValid!: boolean;
  userInputData!: User;
  paymentMethods!: PaymentMethod[];
  selectedPaymentMethod!: string;
  paginatorBooks: Book[] = [];
  pageSize: number = 1;
  quantity: number = 1;
  isBookQuantityEditable = true;
  totalPrice!: number;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public cartOrderService: CartOrderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  // TODO: napravi promenljivu koja ce sadrzati total price kako bi medjuzbir mogao da se sortira u tabeli
  calculateTotalPrice(): number {
    let totalPrice = 0;

    for (let i = 0; i < this.orderedBooks.data.length; i++) {
      const element = this.orderedBooks.data[i];
      const itemTotalPrice = element.price * element.orderedQuantity;
      totalPrice += itemTotalPrice;
    }
    return totalPrice;
  }

  isQuantityValid(book: Book) {
    if (book.orderedQuantity >= book.quantity) {
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  ngOnInit() {
    this.orderedBooks.data = this.cartOrderService.returnAllOrderedBooks();
    // this.order = this.cartOrderService.getOrderById(1);
    this.paymentMethods = this.cartOrderService.getAllPaymentMethods();
    this.paginatorBooks = this.orderedBooks.data.slice(0, this.pageSize);
    // let orderedBooks = this.cartOrderService.returnAllOrderedBooks();
    if (this.orderedBooks.data.length > 0) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }

    this.userInputData = {
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

  onSubmitCustomerData(form: NgForm) {
    this._snackBar.open('Porucili ste knjigu/e', 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      panelClass: ['green-snackbar'],
    });

    let userId: number | undefined;

    if (typeof this.userService.currentUser !== 'undefined') {
      userId = this.userService.currentUser.id;
    }

    // Check if userId is defined before creating a new order
    if (userId !== undefined) {
      // TODO: napravi novu porudzbinu
      let newOrder = this.cartOrderService.createNewOrder(
        userId,
        form.value.name,
        form.value.surename,
        form.value.street,
        form.value.streetNumber,
        form.value.city,
        form.value.zipcode,
        form.value.phone,
        form.value.email,
        form.value.paymentMethod,
        new Date(),
        OrderStatus.Received,
        this.calculateTotalPrice(),
        form.value.commen
      );
    } else {
      console.error(
        'Nije moguce kreirati novu porudzbinu, zato sto korisnik nije ulogovan'
      );
    }

    console.log('All odrers:');
    console.log(this.cartOrderService.getAllOrders());
  }

  ngAfterViewInit() {
    this.orderedBooks.sort = this.sort;
    this.orderedBooks.paginator = this.paginator;
  }

  doFilter(filterValue: String) {
    this.orderedBooks.filter = filterValue.trim().toLowerCase();
  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.orderedBooks.data.length) {
      endIndex = this.orderedBooks.data.length;
    }
    this.paginatorBooks = this.orderedBooks.data.slice(startIndex, endIndex);
  }
}
