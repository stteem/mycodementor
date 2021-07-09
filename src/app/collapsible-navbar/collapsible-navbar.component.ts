import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible-navbar',
  templateUrl: './collapsible-navbar.component.html',
  styleUrls: ['./collapsible-navbar.component.scss']
})
export class CollapsibleNavbarComponent implements OnInit {
  public isMenuCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
