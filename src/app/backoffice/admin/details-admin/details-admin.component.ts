import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../service/admin.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormConfirmationService } from '../../service/form-confirmation.service';

@Component({
  selector: 'app-details-admin',
  templateUrl: './details-admin.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [ConfirmationService, MessageService],
  styleUrls: ['./details-admin.component.css']
})
export class DetailsAdminComponent {
  adminForm: FormGroup;
  adminId: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private formConfirmationService: FormConfirmationService,
    private messageService: MessageService
  ) {
    this.adminForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      specialite: [''],
      contact: [''],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      adresse: [''],
      ville: [''],
      codePostal: [''],
      status: [''],
    });
  }

  ngOnInit(): void {
    this.adminId = this.route.snapshot.paramMap.get('id');
    if (this.adminId != 'null') {
      this.displayAdmin(this.adminId);
    }
  }

  displayAdmin(id: any) {
    this.adminService.getAdminById(id).subscribe((res:any)=> {
      this.adminForm.patchValue(res);
      console.log(this.adminForm.value);
    });
  }

  async onSubmit(): Promise<void> {
    if (this.adminForm.valid) {
      const confirmed = await this.formConfirmationService.confirmSubmit();
      if (confirmed) {
        if (this.adminId != 'null') {
          this.updateAdmin();
        } else {
          this.adminService.addAdmin(this.adminForm.value).subscribe((res: any) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Admin saved successfully' });
            this.adminForm.reset();
            this.router.navigate(['/backoffice/admin']);
          });
        }
      }
    }
  }

  updateAdmin() {
    if (this.adminForm.valid) {
      console.log(this.adminForm.value);
      this.adminService.updateAdmin(this.adminId, this.adminForm.value).subscribe((res: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Admin updated successfully' });
        this.adminForm.reset();
        this.router.navigate(['/backoffice/admin']);
      });
    }
  }
}
