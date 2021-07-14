import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-book-session',
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.scss']
})
export class BookSessionComponent implements OnInit {
  size: NzButtonSize = 'large';

  constructor() { }

  ngOnInit(): void {
  }

}
