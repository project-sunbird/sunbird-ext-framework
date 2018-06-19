import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationPluginComponent } from './integration-plugin.component';

describe('IntegrationPluginComponent', () => {
  let component: IntegrationPluginComponent;
  let fixture: ComponentFixture<IntegrationPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
