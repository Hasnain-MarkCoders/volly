import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeSuccessComponent } from './stripe-success.component';

describe('StripeSuccessComponent', () => {
  let component: StripeSuccessComponent;
  let fixture: ComponentFixture<StripeSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StripeSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
