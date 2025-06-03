import { FactureService } from '../service/facture.service';
import { Facture } from '../model/facture';
import * as html2pdf from 'html2pdf.js';
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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


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

downloadFacture() {
  const element = document.getElementById('facture-content');
  if (element) {
    const opt = {
      margin:       0.5,
      filename:     'facture.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  }
}

printFacture() {
  const printContents = document.getElementById('facture-content')?.innerHTML;
  if (printContents) {
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
}

generatePDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('My Angular PDF Generator', 10, 10);
    doc.setFontSize(12);
    doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );
    const headers = [['Name', 'Email', 'Country']];
    const data = [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
    ];
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30,
    });
    doc.save('table.pdf');
  }
  
}


