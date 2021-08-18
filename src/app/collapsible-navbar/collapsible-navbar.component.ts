import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';

@Component({
  selector: 'app-collapsible-navbar',
  templateUrl: './collapsible-navbar.component.html',
  styleUrls: ['./collapsible-navbar.component.scss']
})
export class CollapsibleNavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  loggedIn = false;

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
    this.isMenuCollapsed = true;
  }

}
