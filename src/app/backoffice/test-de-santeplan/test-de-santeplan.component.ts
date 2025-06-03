import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { testDeSanteplan } from '../model/testDeSanteplan';
import { TestDeSanteplanService } from '../service/test-de-santeplan.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-test-de-santeplan',
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
  templateUrl: './test-de-santeplan.component.html',
  styleUrl: './test-de-santeplan.component.scss'
})
export class TestDeSanteplanComponent {
 testDeSanteplanList: testDeSanteplan[] = [];
    selectedTestDeSanteplan: any;
    testDeSanteplan: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;


    statuses = [
      { label: 'Active', value: true },
      { label: 'Desactive', value: false },
    
  ];
  idPlan: any;

    constructor(private testDeSanteplanservice: TestDeSanteplanService,
         private activatedRoute: ActivatedRoute,
                private messageService: MessageService
         
    ) {}
    

    ngOnInit(): void {
        this.idPlan = this.activatedRoute.snapshot.paramMap.get('idPlan');
        this.displayTestDeSanteplan(this.idPlan);
    }

    displayTestDeSanteplan(idPlan: any) {
        this.testDeSanteplanservice.getAllTestDeSanteplans(idPlan).subscribe((res) => {
            this.testDeSanteplanList = res;
            console.log(this.testDeSanteplanList);
            this.loading = false;
        });
    }

    selectTestDeSanteplan(testDeSanteplan: any) {
        this.selectedTestDeSanteplan = testDeSanteplan;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    updateTestDeSanteplan(md: any) {
        this.testDeSanteplanservice
            .updateTestDeSanteplan(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
               this.displayTestDeSanteplan(this.idPlan);
            });
    }
}
