import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePluginComponent } from './sample-plugin.component';

describe('SamplePluginComponent', () => {
  let component: SamplePluginComponent;
  let fixture: ComponentFixture<SamplePluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
