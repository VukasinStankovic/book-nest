import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BookService } from './book.service';
import {
  Book,
  BookBinding,
  Genre,
  InventoryStatus,
  Language,
  Publisher,
} from './book.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectionList } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartOrderService } from '../cart/cart-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books!: Book[];
  genres!: Genre[];
  publishers!: Publisher[];
  bookBinding!: BookBinding[];
  languages!: Language[];
  bookInventoryStatus: InventoryStatus[] = [];

  // SEARCH
  searchWords!: string;

  // PRICE SLIDER
  minPrice!: number;
  maxPrice!: number;
  startValue!: number;
  endValue!: number;

  //FILTER
  selectedGenres: Genre[] = [];
  selectedPublishers: Publisher[] = [];
  selectedBookBinding: BookBinding[] = [];
  selectedLanguages: Language[] = [];
  selectedStatus!: InventoryStatus;
  filteredBooks: Book[] = [];

  //PAGINATOR
  pageSize: number = 16;
  paginatorBooks: Book[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChildren(MatSelectionList) selectionLists!: QueryList<MatSelectionList>;

  constructor(
    private bookService: BookService,
    public _userService: UserService,
    private dialog: MatDialog,
    private cartOrderService: CartOrderService,
    private _snackBar: MatSnackBar
  ) {}

  openBookDetails(bookId: number) {
    const profileDialog = this.dialog.open(BookDetailsComponent, {
      disableClose: false,
      width: '50vw',
      data: {
        book: this.bookService.getBookById(bookId),
      },
    });
  }

  // SEARCH
  searchBooks() {
    const searchWords = this.searchWords.toLowerCase();
    const searchKeywords = searchWords
      .split(' ')
      .filter((word) => word.trim() !== '');

    this.filteredBooks = this.books.filter((book) => {
      return searchKeywords.every((rec) =>
        book.title.toLowerCase().includes(rec)
      );
    });

    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.paginatorBooks = this.filteredBooks.slice(0, this.pageSize);
  }

  addBookToCart(book: Book) {
    if (book.inventoryStatus != InventoryStatus.OutOfStock) {
      this.cartOrderService.addToCart(book);
      this._snackBar.open('Knjiga je dodata u korpu', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['green-snackbar'],
      });
    }
  }

  // PAGINATOR
  OnPageChange(event: PageEvent) {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > this.filteredBooks.length) {
      endIndex = this.filteredBooks.length;
    }
    this.paginatorBooks = this.filteredBooks.slice(startIndex, endIndex);
  }

  // SLIDER
  formatLabel(value: number): string {
    return `${value + 'din'}`;
  }

  // FILTERING
  applyFilters() {
    this.filteredBooks = this.filterBooks(
      this.books,
      this.selectedGenres,
      this.selectedPublishers,
      this.selectedBookBinding,
      this.selectedLanguages,
      this.selectedStatus,
      this.startValue,
      this.endValue
    );
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.paginatorBooks = this.filteredBooks.slice(0, this.pageSize);
  }

  resetFilters() {
    this.filteredBooks = this.books;
    this.paginatorBooks = this.filteredBooks.slice(0, this.pageSize);
    this.selectionLists.forEach((selectionList: MatSelectionList) => {
      selectionList.selectedOptions.clear();
    });
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
  }

  filterBooks(
    books: Book[],
    selectedGenres: Genre[],
    selectedPublishers: Publisher[],
    selectedBookBinding: BookBinding[],
    selectedLanguages: Language[],
    selectedStatus: InventoryStatus,
    startValue: number,
    endValue: number
  ): Book[] {
    return books.filter((book) => {
      let matchesGenre = true;
      let matchesPublisher = true;
      let matchesBookBinding = true;
      let matchesBookLanguage = true;
      let matchesBookInventoryStatus = true;
      let matchesBookPrice = true;

      if (selectedGenres !== undefined && selectedGenres.length > 0) {
        matchesGenre = book.genre.some((bookGenre) =>
          selectedGenres.includes(bookGenre)
        );
      }

      if (selectedPublishers !== undefined && selectedPublishers.length > 0) {
        matchesPublisher = selectedPublishers.includes(book.publisher);
      }

      if (selectedBookBinding !== undefined && selectedBookBinding.length > 0) {
        matchesBookBinding = selectedBookBinding.includes(book.binding);
      }

      if (selectedLanguages !== undefined && selectedLanguages.length > 0) {
        matchesBookLanguage = selectedLanguages.includes(book.language);
      }

      if (selectedStatus !== undefined && selectedStatus.length > 0) {
        matchesBookInventoryStatus = selectedStatus.includes(
          book.inventoryStatus
        );
      }

      if (selectedLanguages !== undefined && selectedLanguages.length > 0) {
        matchesBookLanguage = selectedLanguages.includes(book.language);
      }

      const bookPrice = book.price;
      matchesBookPrice = bookPrice >= startValue && bookPrice <= endValue;

      return (
        matchesGenre &&
        matchesPublisher &&
        matchesBookBinding &&
        matchesBookLanguage &&
        matchesBookInventoryStatus &&
        matchesBookPrice
      );
    });
  }

  //
  // SORTING
  onSortChange(event: any) {
    switch (event.value) {
      case 'naziv':
        this.bookService.sortBooksByName(this.filteredBooks);
        break;
      case 'datum':
        this.bookService.sortBookByDate(this.filteredBooks);
        break;
      case 'cenaNiza':
        this.bookService.sortBookByPrice(this.filteredBooks);
        break;
      case 'cenaVisa':
        this.bookService.sortBookByPriceHigh(this.filteredBooks);
        break;
    }
    this.paginator.pageIndex = 0;
    this.paginatorBooks = this.filteredBooks.slice(0, this.pageSize);
  }

  getButtonColorClass(book: Book): string {
    if (book.inventoryStatus == InventoryStatus.OutOfStock) return 'mat-warn';
    else book.inventoryStatus == InventoryStatus.InStock;
    return 'mat-primary';
  }

  // TODO: dodaj funkcionalnosti da fun-ja promeni kolicinu knjige
  checkStatus(book: Book) {
    this.bookService.checkInventoryStatus(book);
  }

  ngOnInit() {
    this.books = this.bookService.getBooks();
    this.genres = this.bookService.getAllGenres();
    this.publishers = this.bookService.getAllPublishers();
    this.bookBinding = this.bookService.getAllBookBinding();
    this.languages = this.bookService.getAllLanguages();
    this.bookInventoryStatus = this.bookService.getAllInventoryStatus();

    this.filteredBooks = this.books;
    this.paginatorBooks = this.filteredBooks.slice(0, this.pageSize);

    const minMaxPrices = this.bookService.getMinMaxPrice();
    this.minPrice = minMaxPrices.minPrice;
    this.maxPrice = minMaxPrices.maxPrice;
    this.startValue = this.minPrice;
    this.endValue = this.maxPrice;
  }
}
