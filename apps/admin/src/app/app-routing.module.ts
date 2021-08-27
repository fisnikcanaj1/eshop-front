import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';


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
            }
        ]
    }
];

@NgModule({
  
    imports: [],
    exports: [],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
