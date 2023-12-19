import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigupComponent } from './sigup.component';

describe('SigupComponent', () => {
  let component: SigupComponent;
  let fixture: ComponentFixture<SigupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigupComponent]
    });
    fixture = TestBed.createComponent(SigupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
