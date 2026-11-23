import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubResponsibleTask } from './sub-responsible-task';

describe('SubResponsibleTask', () => {
  let component: SubResponsibleTask;
  let fixture: ComponentFixture<SubResponsibleTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubResponsibleTask],
    }).compileComponents();

    fixture = TestBed.createComponent(SubResponsibleTask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
