import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn? = false;

  constructor(private authservice: AuthenticationService) { }

  ngOnInit(): void {

    this.authservice.loggedIn()
    .subscribe({
      next: res => {
        this.loggedIn = res;
      }
    })
    
  }

  signOut() {
    console.log('sign out')
    this.authservice.logOut();
  }

}
