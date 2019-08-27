import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AppNavComponent } from './components/main/app-nav/app-nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/main/home/home.component';
import { ProductsComponent } from './components/main/products/products.component';
import { ProductFormComponent } from './components/main/product-form/product-form.component';
import { ProductDetailComponent } from './components/main/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductFormComponent },
    ]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    NotFoundComponent,
    HomeComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductDetailComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
