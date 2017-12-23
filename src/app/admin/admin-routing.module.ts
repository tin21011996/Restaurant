import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './home/home.component';
import { EmitterService } from './services/emitter.service';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './category/categories.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WineComponent } from './wine/wine.component';

const appAdminRoutes: Routes = [
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'admin/category', component: CategoriesComponent},
  { path: 'admin/login', component: LoginComponent},
  { path: 'admin/wine_list', component: WineComponent},
  { path: 'admin/register', component: RegisterComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appAdminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
