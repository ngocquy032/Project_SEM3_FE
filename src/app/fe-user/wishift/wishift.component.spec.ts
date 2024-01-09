import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishiftComponent } from './wishift.component';

describe('WishiftComponent', () => {
  let component: WishiftComponent;
  let fixture: ComponentFixture<WishiftComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishiftComponent]
    });
    fixture = TestBed.createComponent(WishiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
