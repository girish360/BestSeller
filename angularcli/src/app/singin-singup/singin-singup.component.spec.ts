import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinginSingupComponent } from './singin-singup.component';

describe('SinginSingupComponent', () => {
  let component: SinginSingupComponent;
  let fixture: ComponentFixture<SinginSingupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinginSingupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinginSingupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
