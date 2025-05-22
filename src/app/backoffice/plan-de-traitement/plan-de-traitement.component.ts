import { PlanDeTraitementService } from '../service/plan-de-traitement.service';
import { PlanDeTraitement } from '../model/planDeTraitement';
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
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-plan-de-traitement',
    templateUrl: './plan-de-traitement.component.html',
    standalone: true,
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
    styleUrls: ['./plan-de-traitement.component.css']
})
export class PlanDeTraitementComponent implements OnInit {
    planDeTraitementList: PlanDeTraitement[] = [];
    selectedPlanDeTraitement: any;

    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue: any;
    statuses: any[] | undefined;
    roleUser!: string | null;
    id!: string | null;

    constructor(private planDeTraitementservice: PlanDeTraitementService,
                      private messageService: MessageService
        
    ) {}

    ngOnInit(): void {
        this.roleUser = localStorage.getItem('role');
        this.id = localStorage.getItem('id');
        if (this.roleUser == 'DOCTEUR') {
            this.getPlanDeTraitementByIdDoctor(this.id);
        } else {
            this.displayPlanDeTraitement();
        }
    }

    displayPlanDeTraitement() {
        this.planDeTraitementservice.getAllPlanDeTraitements().subscribe((res) => {
            this.planDeTraitementList = res;
            console.log(this.planDeTraitementList);
            this.loading = false;
        });
    }

    selectPlanDeTraitement(planDeTraitement: any) {
        this.selectedPlanDeTraitement = planDeTraitement;
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    getPlanDeTraitementByIdDoctor(id: any) {
        this.planDeTraitementservice.getPlanDeTraitementByIdDoctor(id).subscribe((res) => {
            this.planDeTraitementList = res;
            console.log(this.planDeTraitementList);
            this.loading = false;
        });
    }

     updatePlanDeTraitement(md: any) {
        this.planDeTraitementservice
            .updatePlanDeTraitement(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
                this.displayPlanDeTraitement();
            });
    }
}
