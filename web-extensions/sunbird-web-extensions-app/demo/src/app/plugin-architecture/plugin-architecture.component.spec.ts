import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PluginArchitectureComponent } from './plugin-architecture.component';

describe('PluginArchitectureComponent', () => {
  let component: PluginArchitectureComponent;
  let fixture: ComponentFixture<PluginArchitectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginArchitectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginArchitectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
