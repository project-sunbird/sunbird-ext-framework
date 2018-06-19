import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildPluginComponent } from './build-plugin.component';

describe('BuildPluginComponent', () => {
  let component: BuildPluginComponent;
  let fixture: ComponentFixture<BuildPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
