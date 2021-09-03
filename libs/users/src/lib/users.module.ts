import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { InputTextModule } from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    }
]

@NgModule({
    imports: [
        InputTextModule,
        RouterModule.forChild(routes),
        ButtonModule
    ],
    exports: [],
    declarations: [LoginComponent],
    providers: [],
})
export class UsersModule { }
