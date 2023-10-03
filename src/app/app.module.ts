import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RoutingModule } from './app-routing-module';
import { HomeComponent } from './books/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MaterialModule } from './material.module';
import { BookService } from './books/book.service';
import { UserService } from './auth/user.service';
import { BooksComponent } from './books/books.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { CartOrderService } from './cart/cart-order.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    ProfileComponent,
    CartComponent,
    BookDetailsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
  ],
  providers: [BookService, UserService, CartOrderService],
  bootstrap: [AppComponent],
})
export class AppModule {}
