import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Piston } from './piston';

describe('Piston', () => {
  let component: Piston;
  let fixture: ComponentFixture<Piston>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Piston]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Piston);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
