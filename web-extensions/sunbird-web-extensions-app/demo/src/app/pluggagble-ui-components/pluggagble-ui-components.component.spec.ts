import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluggagbleUiComponentsComponent } from './pluggagble-ui-components.component';

describe('PluggagbleUiComponentsComponent', () => {
  let component: PluggagbleUiComponentsComponent;
  let fixture: ComponentFixture<PluggagbleUiComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluggagbleUiComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluggagbleUiComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
