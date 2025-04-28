
import { RouterModule } from '@angular/router';
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
  medicamentplanList: Medicamentplan[] = [];
    selectedMedicamentplan: any;
    medicamentplan: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;


    statuses = [
      { label: 'Active', value: true },
      { label: 'Desactive', value: false },
    
  ];

    constructor(private medicamentplanservice: MedicamentplanService) {}

    ngOnInit(): void {
        this.displayMedicamentplan();
    }

    displayMedicamentplan() {
        this.medicamentplanservice.getAllMedicamentplans().subscribe((res) => {
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
}
