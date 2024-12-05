import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedRetailerComponent } from './requested-retailer.component';

describe('RequestedRetailerComponent', () => {
  let component: RequestedRetailerComponent;
  let fixture: ComponentFixture<RequestedRetailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedRetailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
