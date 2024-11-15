import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillmentsComponent } from './fulfillments.component';

describe('FulfillmentsComponent', () => {
  let component: FulfillmentsComponent;
  let fixture: ComponentFixture<FulfillmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulfillmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfillmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
