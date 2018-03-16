import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePluginComponent } from './manage-plugin.component';

describe('ManagePluginComponent', () => {
  let component: ManagePluginComponent;
  let fixture: ComponentFixture<ManagePluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
