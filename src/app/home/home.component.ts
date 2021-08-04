import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';
//import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  size: NzButtonSize = 'large';

  constructor(private authservice: AuthenticationService) {}

  ngOnInit(): void {
    console.log('load cred from home')
    this.authservice.loadUserCredentials();
  }

}
