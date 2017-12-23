import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CuisineComponent } from './cuisine/cuisine.component';
import { ContactsComponent } from './contacts/contacts.component';
import { WinelistComponent } from './winelist/winelist.component';
import { CookbookComponent } from './cookbook/cookbook.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/home/home.component';
import { CategoriesComponent } from './admin/category/categories.component';
import { PageNotFoundComponent } from './not-found.component';
import { ProductsComponent } from './products/products.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'wine_list', component: WinelistComponent },
  { path: 'cookbook', component: CookbookComponent },
  { path: 'cuisine', component: CuisineComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'productdetail', component: ProductdetailComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
