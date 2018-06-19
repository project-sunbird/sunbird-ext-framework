import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalDocumentationComponent } from './additional-documentation.component';

describe('AdditionalDocumentationComponent', () => {
  let component: AdditionalDocumentationComponent;
  let fixture: ComponentFixture<AdditionalDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
