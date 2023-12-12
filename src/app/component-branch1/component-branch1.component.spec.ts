import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBranch1Component } from './component-branch1.component';

describe('ComponentBranch1Component', () => {
  let component: ComponentBranch1Component;
  let fixture: ComponentFixture<ComponentBranch1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentBranch1Component]
    });
    fixture = TestBed.createComponent(ComponentBranch1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
