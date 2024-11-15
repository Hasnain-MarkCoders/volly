import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateRulesComponent } from './state-rules.component';

describe('StateRulesComponent', () => {
  let component: StateRulesComponent;
  let fixture: ComponentFixture<StateRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
