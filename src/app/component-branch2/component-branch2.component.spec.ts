import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBranch2Component } from './component-branch2.component';

describe('ComponentBranch2Component', () => {
  let component: ComponentBranch2Component;
  let fixture: ComponentFixture<ComponentBranch2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentBranch2Component]
    });
    fixture = TestBed.createComponent(ComponentBranch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
