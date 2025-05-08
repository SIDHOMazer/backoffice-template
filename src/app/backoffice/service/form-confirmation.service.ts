import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class FormConfirmationService {
  constructor(private confirmationService: ConfirmationService) {}

  confirmSubmit(): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        message: 'Are you sure you want to save these changes?',
        header: 'Confirm Save',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

  confirmDelete(): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this record?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

  confirmCancel(): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        message: 'Are you sure you want to cancel? Any unsaved changes will be lost.',
        header: 'Confirm Cancel',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }
}