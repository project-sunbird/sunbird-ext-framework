import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementingPluginApiComponent } from './implementing-plugin-api.component';

describe('ImplementingPluginApiComponent', () => {
  let component: ImplementingPluginApiComponent;
  let fixture: ComponentFixture<ImplementingPluginApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImplementingPluginApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementingPluginApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
