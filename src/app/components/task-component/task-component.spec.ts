import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task-component';
import { AuthService } from '../../services/auth-service/auth-service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('passes header dataset ids and ignores headers without one', () => {
    TestBed.inject(AuthService).loginStatus.set(true);
    fixture.detectChanges();

    const sortableHeader = fixture.nativeElement.querySelector(
      'th[data-id="name"]',
    ) as HTMLTableCellElement;
    sortableHeader.click();
    expect(component.taskService.sortBy()).toBe('name');

    const headerWithoutId = fixture.nativeElement.querySelector(
      'th:not([data-id])',
    ) as HTMLTableCellElement;
    headerWithoutId.click();
    expect(component.taskService.sortBy()).toBe('name');
  });
});
