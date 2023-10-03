import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../book.service';
import { Comment, Book } from '../book.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book!: Book;
  max: number = 5;
  rate!: number;
  quantity: number = 1;
  pageSize: number = 4;
  bookComments: Comment[] = [];
  paginatorBooks: Comment[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public bookService: BookService
  ) {}

  increaseQuantity() {
    if (this.quantity < this.book.quantity) {
      this.quantity++;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  calculateBookAvgRating() {
    if (this.bookComments.length === 0) {
      return (this.book.overallRating = 0);
    }

    const totalRating = this.bookComments.reduce(
      (sum, comment) => sum + comment.customerRating,
      0
    );
    const averageRating = totalRating / this.bookComments.length;

    return (this.book.overallRating = averageRating);
  }

  ngOnInit() {
    this.book = {
      id: this.data.book.id,
      title: this.data.book.title,
      genre: this.data.book.genre,
      author: this.data.book.author,
      publisher: this.data.book.publisher,
      image: this.data.book.image,
      description: this.data.book.description,
      price: this.data.book.price,
      quantity: this.data.book.quantity,
      orderedQuantity: this.data.book.orderedQuantity,
      inventoryStatus: this.data.book.inventoryStatus,
      language: this.data.book.language,
      overallRating: this.data.book.overallRating,
      releaseDate: this.data.book.releaseDate,
      numberOfPages: this.data.book.numberOfPages,
      binding: this.data.book.binding,
      comments: this.data.book.comments,
    };

    this.bookComments = this.book.comments;
    this.paginatorBooks = this.bookComments.slice(0, this.pageSize);
    this.rate = this.calculateBookAvgRating();
  }

  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.bookComments.length) {
      endIndex = this.bookComments.length;
    }
    this.paginatorBooks = this.bookComments.slice(startIndex, endIndex);
  }
}
