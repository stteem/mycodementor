import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../services/auth.service';
import { loggin, logginFailure, logginSuccess } from './login.action';


@Injectable()
export class LoginEffects {

  postLogin$ = createEffect(() => this.actions$.pipe(
    ofType(loggin),
    mergeMap(({user}) => this.authservice.logIn(user)
      .pipe(
        map(user => logginSuccess({user})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private authservice: AuthenticationService
  ) {}
}