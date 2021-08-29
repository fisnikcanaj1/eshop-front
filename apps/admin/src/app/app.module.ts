import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Project components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component'

// 
import { CategoriesService } from '@bluebits/products';

// PrimeNg Modules
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

const UX_MODULE = [
    CardModule,
    ToolbarModule,
    ButtonModule,
    SplitButtonModule,
    TableModule,
    InputTextareaModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule
]

const routes: Routes = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            }, 
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },
            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },
            {
                path: 'products',
                component: ProductsListComponent
            },
            {
                path: 'products/form',
                component: ProductsFormComponent
            },
            {
                path: 'products/form/:id',
                component: ProductsFormComponent
            }
        ]
    }
];



@NgModule({
    declarations: [
        AppComponent, 
        DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
       ... UX_MODULE
    ],
    providers: [CategoriesService, MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
