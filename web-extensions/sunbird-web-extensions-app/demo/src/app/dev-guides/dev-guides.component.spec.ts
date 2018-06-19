import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevGuidesComponent } from './dev-guides.component';

describe('DevGuidesComponent', () => {
  let component: DevGuidesComponent;
  let fixture: ComponentFixture<DevGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
