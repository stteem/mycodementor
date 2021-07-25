import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowloginComponent } from './showlogin.component';

describe('ShowloginComponent', () => {
  let component: ShowloginComponent;
  let fixture: ComponentFixture<ShowloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
