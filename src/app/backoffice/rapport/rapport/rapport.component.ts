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
import { RapportService } from '../../service/rapport.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
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
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent  implements OnInit {
  rapportList: any[] = [];
  selectedRapport: any;
reportList: any;
loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
  statusValue!: null | boolean;


  statuses = [
    { label: 'Active', value: true },
    { label: 'Desactive', value: false },
  
];
  constructor(private rapportservice:RapportService,
    private route :ActivatedRoute,
                  private messageService: MessageService
    
  ) { }

  ngOnInit(): void {
    const patientID=this.route.snapshot.params['id'];
    console.log(patientID);
    
    if(patientID !='null'){
      this.displayRapportByPatient(patientID);
    
    }else {
      this.displayRapport();

    }
  }

  displayRapport() {
    this.rapportservice.getAllRapports().subscribe((res:any)=>{
      this.rapportList = res;
      console.log(this.rapportList);
      this.loading = false;
    });
  }
  displayRapportByPatient(id:any) {
    this.rapportservice.getAllRapportsByPatient(id).subscribe((res:any)=>{
      this.rapportList = res;
      console.log(this.rapportList);
      this.loading = false;
    });
  }

  selectRapport(rapport:any){
    this.selectedRapport=rapport;
 }
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
  table.clear();
  this.filter.nativeElement.value = '';
}
  updateRapport(md: any) {
        this.rapportservice
            .updateRapport(md.id, {
                status: false
            })
            .subscribe((res: any) => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Medication deleted successfully' });
                this.displayRapport();
            });
    }
}
