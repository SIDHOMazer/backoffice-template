import { FactureService } from '../service/facture.service';
import { Facture } from '../model/facture';

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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
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
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  factureList: Facture[] = [];
   selectedFacture: any;
   loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
  statusValue!: null | boolean;


  statuses = [
    { label: 'Active', value: true },
    { label: 'Desactive', value: false },
  
];

   constructor(private  factureservice:FactureService,
                  private messageService: MessageService
    
   ) { }
 
   ngOnInit(): void {
     this.displayFacture();
   }
   
   displayFacture() {
     this. factureservice.getAllFactures().subscribe((res)=>{
       this. factureList = res;
       console.log(this. factureList);
        this.loading = false;
     });
   }
 
   selectFacture( facture:any){
     this.selectedFacture= facture;
  }
    
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
  table.clear();
  this.filter.nativeElement.value = '';
}

updateFacture(md: any) {
        this.factureservice
            .updateFacture(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
                this.displayFacture();
            });
    }

}
