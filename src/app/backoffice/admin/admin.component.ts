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
import { AdminService } from '../service/admin.service';
import { Admin } from '../model/admin';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
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
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminList: Admin[] = [];
  @ViewChild('filter') filter!: ElementRef;

  selectedAdmin: any;
  loading: boolean = true;
  statusValue!: null | boolean;
  villeValue!: null | string;


  statuses = [
    { label: 'Active', value: true },
    { label: 'Desactive', value: false },
  
];
villes: any[]|undefined;



  constructor(private adminservice: AdminService) { }

  ngOnInit(): void {
    this.displayAdmin();
  }

  displayAdmin() {
    this.adminservice.getAllAdmins().subscribe((res)=>{
     this.adminList = res;
    console.log(this.adminList);
    this.loading = false;
    });
  
  }

  selectAdmin(admin:any){
    this.selectedAdmin=admin;
 }
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

clear(table: Table) {
  table.clear();
  this.filter.nativeElement.value = '';
}

}


