import { Injectable } from '@angular/core';
import { UserService } from '../auth/user.service';
import { BookService } from '../books/book.service';
import { CartOrder, OrderStatus, PaymentMethod } from './cart-order.model';
import { Book, InventoryStatus } from '../books/book.model';

@Injectable()
export class CartOrderService {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService
  ) {}

  books = this.bookService.getBooks();
  users = this.userService.getAllUsers();

  orderedBooks: Book[] = [];

  private dummyCartOrderList: Array<CartOrder> = [
    {
      id: 1,
      books: [this.books[0], this.books[1], this.books[3]],
      userId: this.users[0].id,
      customerName: this.users[0].name,
      customerSurename: this.users[0].surename,
      customerStreet: this.users[0].street,
      customerStreetNumber: this.users[0].streetNumber,
      customerCity: 'Vranje',
      customerZipCode: 17500,
      customerPhone: this.users[0].phone,
      customerEmail: this.users[0].email,
      paymentMethod: PaymentMethod.CreditCard,
      date: new Date(2023, 8, 6),
      status: OrderStatus.InProgress,
      totalPrice: 4638,
    },
    {
      id: 2,
      books: [this.books[2], this.books[4], this.books[1]],
      userId: this.users[1].id,
      customerName: this.users[1].name,
      customerSurename: this.users[1].surename,
      customerStreet: this.users[1].street,
      customerStreetNumber: this.users[1].streetNumber,
      customerCity: 'Beograd',
      customerZipCode: 11000,
      customerPhone: this.users[1].phone,
      customerEmail: this.users[1].email,
      paymentMethod: PaymentMethod.CreditCard,
      date: new Date(2023, 8, 2),
      status: OrderStatus.Received,
      totalPrice: 11415,
    },
  ];

  getAllOrders() {
    return this.dummyCartOrderList;
  }

  getOrderById(orderId: number) {
    let foundOrder!: CartOrder;
    this.dummyCartOrderList.forEach((order) => {
      if (order.id === orderId) {
        foundOrder = order;
      }
    });

    return foundOrder;
  }

  getAllBooksFromOrder(orderId: number) {
    let books: Book[] = [];
    let order: CartOrder;
    order = this.getOrderById(orderId);

    order.books.forEach((element) => {
      books.push(element);
    });

    return books;
  }

  getAllPaymentMethods(): PaymentMethod[] {
    const allGenres: PaymentMethod[] = Object.values(PaymentMethod);
    return allGenres;
  }

  createNewOrder(
    userId: number,
    customerName: string,
    customerSurename: string,
    customerStreet: string,
    customerStreetNumber: number,
    customerCity: string,
    customerZipCode: number,
    customerPhone: string,
    customerEmail: string,
    paymentMethod: PaymentMethod,
    date: Date,
    status: OrderStatus,
    totalPrice: number,
    customerNote?: string
  ): CartOrder {
    let maxId: number = 0;

    this.dummyCartOrderList.forEach((order) => {
      if (maxId < order.id) {
        maxId = order.id;
      }
    });

    let id = ++maxId;
    let books = this.orderedBooks;

    let newOrder: CartOrder = {
      id,
      books,
      userId,
      customerName,
      customerSurename,
      customerStreet,
      customerStreetNumber,
      customerCity,
      customerZipCode,
      customerPhone,
      customerEmail,
      paymentMethod,
      date,
      status,
      totalPrice,
      customerNote,
    };

    this.dummyCartOrderList.push(newOrder);
    this.bookService.setQuantityAfterOrder(books);
    this.resetCart();

    console.log(
      'Current state of dummyCartOrderList after adding new order is:'
    );
    console.log(this.dummyCartOrderList);

    return newOrder;
  }

  countBooksInCart(orderId: number): number {
    let foundOrder = this.getOrderById(orderId);

    if (foundOrder) {
      let numberOfBooksInCart = 0;
      foundOrder.books.forEach((element) => {
        numberOfBooksInCart += element.orderedQuantity;
      });
      return numberOfBooksInCart;
    } else {
      return 0;
    }
  }

  countBooksInCurrentCart(): number {
    let numberOfBooksInCart = 0;
    this.orderedBooks.forEach((book) => {
      numberOfBooksInCart += book.orderedQuantity;
    });
    return numberOfBooksInCart;
  }

  addToCart(book: Book, orderedQuantity?: number) {
    const existingBook = this.orderedBooks.find((b) => b.id === book.id);

    if (book.orderedQuantity < book.quantity) {
      if (existingBook) {
        this.bookService.setOrderedQuantity(book, orderedQuantity);
        this.bookService.checkInventoryStatus(book);
      } else {
        this.bookService.setOrderedQuantity(book, orderedQuantity);
        this.bookService.checkInventoryStatus(book);
        this.orderedBooks.push(book);
      }
    } else {
      book.inventoryStatus = InventoryStatus.OutOfStock;
    }

    console.log('orderedBooks looks like this:');
    console.log(this.orderedBooks);
  }

  // TODO: izmeni logiku tako da book.orderedQuantity smanjuje sve dok ne dodje do 1, a tek onda da se ukloni knjiga
  removeFromCart(bookId: number) {
    const index = this.orderedBooks.findIndex((book) => book.id === bookId);

    if (index !== -1) {
      const removedBook = this.orderedBooks[index];
      this.orderedBooks.splice(index, 1);
      removedBook.orderedQuantity--;
      removedBook.quantity++;
    }
  }

  resetCart() {
    this.orderedBooks = [];
  }

  returnAllOrderedBooks(): Book[] {
    return this.orderedBooks;
  }
}
