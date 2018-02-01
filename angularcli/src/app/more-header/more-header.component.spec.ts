import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreHeaderComponent } from './more-header.component';

describe('MoreHeaderComponent', () => {
  let component: MoreHeaderComponent;
  let fixture: ComponentFixture<MoreHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
