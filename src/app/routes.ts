import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSessionComponent } from './book-session/book-session.component';
import { ShowloginComponent } from './showlogin/showlogin.component';



export const routes: Routes = [
    { path: 'booksession', component: BookSessionComponent},
    { path: 'login', component: ShowloginComponent},
    { path: 'home',  component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];