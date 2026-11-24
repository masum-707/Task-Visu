import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sorting } from './sorting';

describe('Sorting', () => {
  let component: Sorting;
  let fixture: ComponentFixture<Sorting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sorting],
    }).compileComponents();

    fixture = TestBed.createComponent(Sorting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
