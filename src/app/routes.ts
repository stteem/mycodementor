import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSessionComponent } from './book-session/book-session.component';


export const routes: Routes = [
    { path: 'booksession', component: BookSessionComponent},
    { path: 'home',  component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];