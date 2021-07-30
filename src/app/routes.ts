import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSessionComponent } from './book-session/book-session.component';
import { LoginComponent } from './login/login.component';



export const routes: Routes = [
    { path: 'booksession', component: BookSessionComponent},
    { path: 'login', component: LoginComponent},
    { path: 'home',  component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];