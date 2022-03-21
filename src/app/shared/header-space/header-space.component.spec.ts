import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSpaceComponent } from './header-space.component';

describe('HeaderSpaceComponent', () => {
  let component: HeaderSpaceComponent;
  let fixture: ComponentFixture<HeaderSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
