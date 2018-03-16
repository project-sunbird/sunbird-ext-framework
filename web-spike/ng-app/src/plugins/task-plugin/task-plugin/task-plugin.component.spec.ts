import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskPluginComponent } from './task-plugin.component';

describe('TaskPluginComponent', () => {
  let component: TaskPluginComponent;
  let fixture: ComponentFixture<TaskPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
