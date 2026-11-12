import { inject, Injectable, signal } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ApiService } from '../api-service/api-service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  apiService = inject(ApiService);
  formStatus = signal(false);
  userMap = new Map();
  taskPriorityMap = new Map();

  dateValidityCheck(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const date1Value = control.get(controlName1)?.value;
      const date2Value = control.get(controlName2)?.value;
      if (date2Value && !date1Value) {
        return { dateValidityCheck: true };
      }
      if (!date1Value || !date2Value) {
        return null;
      }

      const date1 = new Date(date1Value);
      const date2 = new Date(date2Value);

      if (date1 > date2) {
        return { dateValidityCheck: true };
      }

      return null;
    };
  }
}
