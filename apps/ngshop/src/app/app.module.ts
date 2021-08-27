import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UiModule } from '@bluebits/ui';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [{
  path: '',
  component: HomePageComponent
}, {
  path: 'products',
  component: ProductListComponent
}]

@NgModule({
  declarations: [AppComponent, HomePageComponent, ProductListComponent, FooterComponent, HeaderComponent, DashboardComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(routes), 
    RouterModule, 
    RouterModule,
    UiModule,
    AccordionModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
