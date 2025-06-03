import { DetailsRapportService } from '../../service/details-rapport.service';
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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DetailsRapport } from '../../model/detailsRaport';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-details-rapport',
  templateUrl: './details-rapport.component.html',
   standalone: true,
    imports: [CommonModule,RouterModule
    ,TableModule,
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
            IconFieldModule],
  styleUrls: ['./details-rapport.component.css']
})
export class DetailsRapportComponent {
  detailsRapportist: DetailsRapport[] = [];
   selectedDetailsRapport: any;
   loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
statusValue: any;
statuses: any[]|undefined;
idRapport: any;
idPlan: any;
  idPatient!: string | null;
   constructor(private  detailsRapportservice:  DetailsRapportService,
    private activatedRoute :ActivatedRoute,
                    private messageService: MessageService
    
  ) { }
 
   ngOnInit(): void {
    this.idRapport = this.activatedRoute.snapshot.paramMap.get('idRapport');
    this.idPatient = this.activatedRoute.snapshot.paramMap.get('id');
     this.displayDetailsRapport(this.idRapport);
   }
 
   displayDetailsRapport(rapportId: any) {
     this. detailsRapportservice.getAllDetailsRapportsByRapport(rapportId).subscribe((res:any)=>{
      this. detailsRapportist = res;
     console.log(this. detailsRapportist);
        this.loading = false; 
     });
   
   }
 
   selectDetailsRapport( detailsRapport:any){
     this.selectedDetailsRapport= detailsRapport;
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
   updateDetailsRapport(md: any) {
        this.detailsRapportservice
            .updateDetailsRapport(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
               this.displayDetailsRapport(this.idPlan);
            });
    }
}
