import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KindergardenInfoComponent } from './kindergarden-info.component';

describe('KindergardenInfoComponent', () => {
  let component: KindergardenInfoComponent;
  let fixture: ComponentFixture<KindergardenInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KindergardenInfoComponent]
    });
    fixture = TestBed.createComponent(KindergardenInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
