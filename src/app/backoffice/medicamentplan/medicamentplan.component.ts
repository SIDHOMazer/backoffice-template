
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { Table, TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { TagModule } from 'primeng/tag';
import { MedicamentplanService } from '../service/medicamentplan.service';
import { Medicamentplan } from '../model/medicamentplan';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-medicamentplan',
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    MultiSelectModule,
    SelectModule,
    InputIconModule,
    TagModule,
    InputTextModule,
    SliderModule,
    ProgressBarModule,
    ToggleButtonModule,
    ToastModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    RatingModule,
    RippleModule,
    IconFieldModule
],
  templateUrl: './medicamentplan.component.html',
  styleUrl: './medicamentplan.component.scss'
})
export class MedicamentplanComponent {
  
goToPlanDeTraitement() {
throw new Error('Method not implemented.');
}


  medicamentplanList: Medicamentplan[] = [];
    selectedMedicamentplan: any;
    medicamentplan: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;
    idPlan: any;

    statuses = [
      { label: 'Active', value: true },
      { label: 'Desactive', value: false },
    
  ]

  
    constructor(private medicamentplanservice: MedicamentplanService,
      //new
      private activatedRoute: ActivatedRoute,
       private messageService: MessageService
    ) {}

    ngOnInit(): void {
      //new
      this.idPlan= this.activatedRoute.snapshot.paramMap.get('idPlan');
      
        this.displayMedicamentplan(this.idPlan);
    }

    displayMedicamentplan(idPlan: any) {
        this.medicamentplanservice.getAllMedicamentplans(idPlan).subscribe((res) => {
            this.medicamentplanList = res;
            console.log(this.medicamentplanList);
            this.loading = false;
        });
    }

    selectMedicamentplan(medicamentplan: any) {
        this.selectedMedicamentplan = medicamentplan;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
       updateMedicamentplan(md: any) {
        this.medicamentplanservice
            .updateMedicamentplan(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
               this.displayMedicamentplan(this.idPlan);
            });
    }
}
