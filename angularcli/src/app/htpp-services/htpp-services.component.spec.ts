import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtppServicesComponent } from './htpp-services.component';

describe('HtppServicesComponent', () => {
  let component: HtppServicesComponent;
  let fixture: ComponentFixture<HtppServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtppServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtppServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
