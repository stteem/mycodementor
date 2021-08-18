import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSessionComponent } from './book-session/book-session.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SubscriptionComponent } from './subscription/subscription.component';



export const routes: Routes = [
    { path: 'booksession', component: BookSessionComponent},
    { path: 'subscription', component: SubscriptionComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'home',  component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];