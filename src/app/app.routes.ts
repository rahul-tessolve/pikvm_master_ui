import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

export const routes: Routes = [
    { 
        path: 'register', component: RegisterComponent 
    },
    { 
        path: 'login', component: LoginComponent 
    },
    { 
        path: 'header', component: HeaderComponent 
    },
];
