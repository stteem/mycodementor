import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleNavbarComponent } from './collapsible-navbar.component';

describe('CollapsibleNavbarComponent', () => {
  let component: CollapsibleNavbarComponent;
  let fixture: ComponentFixture<CollapsibleNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsibleNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
