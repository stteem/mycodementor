import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { User, UserData } from '../state/login/user.model';
import { Store } from '@ngrx/store';
import { logginSuccess } from '../state/login/login.action';


interface AuthResponse {
  firstname: string;
  token: string;
  subscription: object;
  isSubscribed: boolean;
}

interface JWTResponse {
  status: string;
  success: string;
  user: any;
}

interface JWT {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  tokenKey = 'JWT';
  isAuthenticated: Boolean = false;
  username: Subject<string> = new Subject<string>();
  logged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //Subject<boolean> = new Subject<boolean>();
  authToken: string | undefined;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHttpmsgService,
    private router: Router,
    private store: Store) { }

  

  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'user/checkJWTtoken')
    .subscribe({
      next: (res) => {
        console.log('JWT Token Valid: ', res);
        this.sendUsername(res.user);
      },
      error: (e) => {
        console.error('JWT Token invalid: ', e);
        this.destroyUserCredentials();
      },
      complete: () => console.info('complete')
    })
  }

  sendUsername(name: string) {
    this.username.next(name);
  }

  clearUsername() {
    this.username.next(undefined);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;
    this.logged.next(true);
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  
  loadUserCredentials() {
    const credentials = localStorage.getItem(this.tokenKey);
    if (credentials !== null) {
      this.useCredentials(JSON.parse(credentials));
      if (this.authToken) {
        this.checkJWTtoken();
      }
    }
  }

  storeUserCredentials(credentials: any) {
    console.log('storeUserCredentials ', credentials);
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
    
    const user : UserData = {
      username: credentials.username, 
      token: credentials.token, 
      loggedin: true,
      subscription: credentials.subscription,
      isSubscribed: credentials.isSubscribed
    }
    this.store.dispatch(logginSuccess({user}));
  }

  logIn(user: User): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'user/login', user)
      .pipe( map(res => {
        console.log('pipe res ',res);
          this.storeUserCredentials({
            username: res.firstname, 
            token: res.token, 
            subscription: res.subscription,
            isSubscribed: res.isSubscribed
          });
          return {
            'success': true, 
            'username': res.firstname, 
            'isSubscribed': res.isSubscribed
          };
      }),
       /*catchError(error => {
        console.error("error caught", error);
          return of({errMsg: error.error.status});
       })*/
       catchError(error => this.processHTTPMsgService.handleError(error)));
  }


  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
    this.logged.next(false);
  }

  logOut() {
    this.destroyUserCredentials();
    return this.router.navigateByUrl('/home');
  }

  loggedIn(): Observable<boolean> {
    return this.logged.asObservable();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }

  getToken(): string | undefined {
    return this.authToken;
  }
}
