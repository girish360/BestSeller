import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysSubscribesComponent } from './categorys-subscribes.component';

describe('CategorysSubscribesComponent', () => {
  let component: CategorysSubscribesComponent;
  let fixture: ComponentFixture<CategorysSubscribesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorysSubscribesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorysSubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
