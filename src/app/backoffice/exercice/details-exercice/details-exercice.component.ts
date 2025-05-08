import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciceService } from '../../service/exercice.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
  selector: 'app-details-exercice',
  templateUrl: './details-exercice.component.html',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    FileUploadModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService]
})
export class DetailsExerciceComponent {
  exerciceForm: FormGroup;
  exerciceId: any;

  constructor(
    private fb: FormBuilder,
    private exerciceService: ExerciceService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.exerciceForm = this.fb.group({
      description: ['', Validators.required],
      file: [''],
      nameExercice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.exerciceId = this.route.snapshot.paramMap.get('id');
    if (this.exerciceId != 'null') {
      this.displayExercice(this.exerciceId);
    }
  }

  displayExercice(id: any) {
    this.exerciceService.getExerciceById(id).subscribe((res:any) => {
      this.exerciceForm.patchValue(res);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.exerciceForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.exerciceId != 'null') {
          this.updateExercice();
        } else {
          this.exerciceService.addExercice(this.exerciceForm.value).subscribe((res:any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise saved successfully' });
            this.exerciceForm.reset();
            this.router.navigate(['/backoffice/exercice']);
          });
        }
      }
    }
  }

  updateExercice() {
    if (this.exerciceForm.valid) {
      this.exerciceService.updateExercice(this.exerciceId, this.exerciceForm.value).subscribe((res:any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise updated successfully' });
        this.exerciceForm.reset();
        this.router.navigate(['/backoffice/exercice']);
      });
    }
  }

  onFileSelect(event: any) {
    if (event.files && event.files.length) {
      const file = event.files[0];
      this.exerciceForm.patchValue({
        file: file.name
      });
    }
  }
}
