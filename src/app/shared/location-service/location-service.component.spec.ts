import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationServiceComponent } from './location-service.component';

describe('LocationServiceComponent', () => {
  let component: LocationServiceComponent;
  let fixture: ComponentFixture<LocationServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
