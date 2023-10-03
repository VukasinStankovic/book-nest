import { Component, HostListener, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book, Genre, InventoryStatus } from '../book.model';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books!: Book[];
  topThreeGenres!: Genre[];
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;
  carouselIntervals: number = 2000;

  constructor(
    private bookService: BookService,
    public _userService: UserService
  ) {}

  getTop10BooksByGenre(genre: Genre): Book[] {
    const booksByGenre = this.books.filter((book) =>
      book.genre.includes(genre)
    );
    const sortedBooks = booksByGenre.sort((a, b) => b.quantity - a.quantity);
    return sortedBooks.slice(0, 10);
  }

  getButtonColorClass(book: Book): string {
    if (book.inventoryStatus == InventoryStatus.OutOfStock) return 'mat-warn';
    else book.inventoryStatus == InventoryStatus.InStock;
    return 'mat-primary';
  }

  ngOnInit() {
    this.updateItemsPerSlide(window.innerWidth); // Inicijalno podešavanje broja slajdova
    this.books = this.bookService.getBooks();
    this.topThreeGenres = [Genre.ComputerScience, Genre.Drama, Genre.History];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerSlide(event.target.innerWidth);
  }

  updateItemsPerSlide(windowWidth: number) {
    if (windowWidth <= 1400) {
      this.itemsPerSlide = 5; // Smanjite za 1 kada je širina manja ili jednaka 1400px
    }
    if (windowWidth <= 1000) {
      this.itemsPerSlide = 3; // Smanjite za 1 kada je širina manja ili jednaka 1000px
    }
    if (windowWidth <= 600) {
      this.itemsPerSlide = 2; // Smanjite za 1 kada je širina manja ili jednaka 600px
    }
    // Dodajte više uslova prema potrebi za dodatne tačke preloma
  }
}
