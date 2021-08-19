import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSessionComponent } from './book-session/book-session.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { BookSessionGuard } from './services/booksession.guard';
import { SignupGuard } from './services/signup.guard';
import { SubscriptionResolver } from './services/subscription.resolver';


export const routes: Routes = [
    { path: 'booksession', component: BookSessionComponent, canActivate: [BookSessionGuard], resolve: {data: SubscriptionResolver}},
    { path: 'subscription', component: SubscriptionComponent},
    { path: 'login', component: LoginComponent, canActivate: [SignupGuard]},
    { path: 'signup', component: SignupComponent, canActivate: [SignupGuard]},
    { path: 'home',  component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];