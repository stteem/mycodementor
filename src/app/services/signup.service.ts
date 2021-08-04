import { Injectable } from '@angular/core';
import { Signup } from '../shared/signup';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient,
  	private ProcessHttpmsgService: ProcessHttpmsgService) { }

     httpOptions = {
  		headers: new HttpHeaders({
  			'Content-Type': 'application/json'
  		})
  	};

  emailExists(email: string) {
    console.log('email exists ',email)
    const body = {email: email};
    return this.http.post<any>(baseURL + 'user/emailexists', body, this.httpOptions)
  	.pipe(catchError(this.ProcessHttpmsgService.handleError));
  }

  submitSignup(signup: Signup): Observable<Signup> {
  	return this.http.post<Signup>(baseURL + 'user/signup', signup, this.httpOptions)
  	.pipe(catchError(this.ProcessHttpmsgService.handleError));
  }
}
