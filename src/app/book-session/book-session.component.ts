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

  /*isCalendlyEvent(e: any) {
    return e.data.event &&
           e.data.event.indexOf('calendly') === 0;
  };
   
  window.addEventListener(
    'message',
    (e) {
      if (isCalendlyEvent(e)) {
        console.log(e.data);
      }
    }
  );*/

}
