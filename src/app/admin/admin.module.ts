import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { EmitterService } from './services/emitter.service';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { ListCategoryComponent } from './category/list-category/list-category.component';
import { CategoriesComponent } from './category/categories.component';
import { LoginComponent } from './login/login.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guadrs';
import { RegisterComponent } from './register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages/module/module';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AlertService } from './services/alert.service';
import { AddWineComponent } from './wine/add-wine/add-wine.component';
import { WineComponent } from './wine/wine.component';
import { WineListComponent } from './wine/wine-list/wine-list.component';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    AdminRoutingModule,
    FlashMessagesModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    DashboardComponent,
    NavbarComponent,
    CategoriesComponent,
    ProductsComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductListComponent,
    RegisterComponent,
    LoginComponent,
    WineComponent,
    WineListComponent,
    AddWineComponent
  ],
  providers: [EmitterService, AlertService, ValidateService, AuthService, FormBuilder, AuthGuard, FlashMessagesService]
})
export class AdminModule {}
