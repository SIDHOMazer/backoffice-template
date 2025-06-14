import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestDeSanteService } from '../../service/test-de-sante.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
    selector: 'app-details-test-de-sante',
    templateUrl: './details-test-de-sante.component.html',
    styleUrls: ['./details-test-de-sante.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, InputTextModule, TextareaModule, ConfirmDialogModule, InputNumberModule, CalendarModule, DropdownModule, SelectButtonModule, RouterModule, FileUploadModule, ToastModule],
    providers: [ConfirmationService, MessageService]
})
export class DetailsTestDeSanteComponent {
    testDeSanteForm: FormGroup;
    testDeSanteId: any;
    statusOptions = [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false }
    ];
    selectedImage: any;

    constructor(
        private fb: FormBuilder,
        private testDeSanteService: TestDeSanteService,
        private router: Router,
        private route: ActivatedRoute,
        private formConfirmationService: FormConfirmationService,
        private messageService: MessageService
    ) {
        this.testDeSanteForm = this.fb.group({
            testName: ['', Validators.required],
            description: ['', Validators.required],
            file: [''],
            status: ['true']
        });
    }

    ngOnInit(): void {
        this.testDeSanteId = this.route.snapshot.paramMap.get('id');
        if (this.testDeSanteId != 'null') {
            this.displayTestDeSante(this.testDeSanteId);
        }
    }

    displayTestDeSante(id: any) {
        this.testDeSanteService.getTestDeSanteById(id).subscribe((res: any) => {
            this.testDeSanteForm.patchValue(res);
        });
    }

    async onSubmit(): Promise<void> {
        if (this.testDeSanteForm.valid) {
            const confirmed = await this.formConfirmationService.confirmSubmit();
            if (confirmed) {
                if (this.testDeSanteId != 'null') {
                    this.updateTestDeSante();
                } else {
                    this.testDeSanteService.addTestDeSante({ ...this.testDeSanteForm.value, file: this.selectedImage }).subscribe((res: any) => {
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test saved successfully' });
                        this.testDeSanteForm.reset();
                        this.router.navigate(['/backoffice/testDeSante']);
                    });
                }
            }
        }
    }

    updateTestDeSante() {
        if (this.testDeSanteForm.valid) {
            this.testDeSanteService.updateTestDeSante(this.testDeSanteId, { ...this.testDeSanteForm.value, file: this.selectedImage }).subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Health test updated successfully' });
                this.testDeSanteForm.reset();
                this.router.navigate(['/backoffice/testDeSante']);
            });
        }
    }
    onFileSelect(event: any) {
        if (event.files && event.files.length) {
            const file = event.files[0];
            this.selectedImage = file;
        }
    }
}
