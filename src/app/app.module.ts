import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './/app-routing.module';
import { WinelistComponent } from './winelist/winelist.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { SliderComponent } from './slider/slider.component';
import { AdminModule } from './admin/admin.module';
import { PageNotFoundComponent } from './not-found.component';
import { DashComponent } from './dash/dash.component';
import { DashproductComponent } from './dashproduct/dashproduct.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ProductdetailListComponent } from './productdetail/productdetail-list/productdetail-list.component';
import { EmitterService } from './admin/services/emitter.service';
import { HttpModule } from '@angular/http';
import { AddProductdetailComponent } from './productdetail/add-productdetail/add-productdetail.component';
import { CartComponent } from './cart/cart.component';
import { ItemService } from './cart/servicescart/item.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactsComponent,
    CuisineComponent,
    WinelistComponent,
    CookbookComponent,
    GalleryComponent,
    PageNotFoundComponent,
    DashComponent,
    DashproductComponent,
    ProductsComponent,
    ProductdetailComponent,
    ProductdetailListComponent,
    AddProductdetailComponent,
    CartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [EmitterService, ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
