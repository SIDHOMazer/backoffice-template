
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
import { TestDeSanteService } from '../service/test-de-sante.service';
import { testDeSante } from '../model/testDeSante';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-test-de-sante',
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
  templateUrl: './test-de-sante.component.html',
  styleUrl: './test-de-sante.component.scss'
})
export class TestDeSanteComponent {
  testDeSanteList: testDeSante[] = [];
    selectedTestDeSante: any;
    testDeSante: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;


    statuses = [
      { label: 'Active', value: true },
      { label: 'Desactive', value: false },
    
  ];

    constructor(private testDeSanteservice: TestDeSanteService,
              private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.displayTestDeSante();
    }

    displayTestDeSante() {
        this.testDeSanteservice.getAllTestDeSantes().subscribe((res) => {
            this.testDeSanteList = res;
            console.log(this.testDeSanteList);
            this.loading = false;
        });
    }

    selectTestDeSante(testDeSante: any) {
        this.selectedTestDeSante = testDeSante;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
    updateTestDeSante(md: any) {
        this.testDeSanteservice
            .updateTestDeSante(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
                this.displayTestDeSante();
            });
    }
}
