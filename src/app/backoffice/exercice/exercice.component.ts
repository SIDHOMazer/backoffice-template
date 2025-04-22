import { Exercice } from '../model/exercice';
import { ExerciceService } from '../service/exercice.service';
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

@Component({
  selector: 'app-exercice',
  templateUrl: './exercice.component.html',
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
  styleUrls: ['./exercice.component.css']
})
export class ExerciceComponent {
  exerciceList: Exercice[] = [];
    selectedExercice: any;
exercice: any;
loading: boolean = true;
  @ViewChild('filter') filter!: ElementRef;
  statusValue!: null | boolean;


      statuses = [
        { label: 'Active', value: true },
        { label: 'Desactive', value: false },
      
    ];
  
    constructor(private exerciceservice:ExerciceService) { }
  
    ngOnInit(): void {
      this.displayExercice();
    }
    
    displayExercice() {
      this.exerciceservice.getAllExercices().subscribe((res)=>{
        this.exerciceList = res;
        console.log(this.exerciceList);
        this.loading = false;
      });
    }
  
    selectExercice(exercice:any){
      this.selectedExercice=exercice;
   }
   onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
