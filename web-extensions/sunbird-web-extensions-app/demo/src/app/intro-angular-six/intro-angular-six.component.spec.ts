import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroAngularSixComponent } from './intro-angular-six.component';

describe('IntroAngularSixComponent', () => {
  let component: IntroAngularSixComponent;
  let fixture: ComponentFixture<IntroAngularSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroAngularSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroAngularSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
