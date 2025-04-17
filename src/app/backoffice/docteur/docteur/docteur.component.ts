
import { Docteur } from '../../model/docteur';
import { DocteurService } from '../../service/docteur.service';
import { RouterModule } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
@Component({
  selector: 'app-docteur',
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
          IconFieldModule]
,  templateUrl: './docteur.component.html',
  styleUrls: ['./docteur.component.css']
})
export class DocteurComponent implements OnInit {
  docteurList: Docteur[] = [];
  selectedDocteur: any;
  loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
  constructor(private docteurservice:DocteurService) { }

  ngOnInit(): void {
    this.displayDocteur();
  }
  
  displayDocteur() {
    this.docteurservice.getAllDocteur().subscribe((res)=>{
      this.docteurList = res;
      console.log(this.docteurList);
      this.loading = false;
    });
  }

  selectDocteur(docteur:any){
    this.selectedDocteur=docteur;
 }
  
 
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
  table.clear();
  this.filter.nativeElement.value = '';
}

  } 


