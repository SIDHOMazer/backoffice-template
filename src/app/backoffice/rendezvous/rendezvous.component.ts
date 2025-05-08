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
import { RendezvousService } from '../service/rendezvous.service';
import { Rendezvous } from '../model/rendezvous';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

import { DatePickerModule } from 'primeng/datepicker';


@Component({
    selector: 'app-rendezvous',
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
        IconFieldModule,
        DialogModule,
        DatePickerModule
    ],


    templateUrl: './rendezvous.component.html',
    styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
    rendezvousList: Rendezvous[] = [];
minDate=new Date()
    selectedRendezvous: any;
    loading: boolean = true;
    @ViewChild('filter') filter!: ElementRef;
    statusValue!: null | boolean;

    visibleUpateAppointement: boolean = false;
    appointement:any=null
    appointementDate=new Date();
    statuses = [
        { label: 'Accepter', value: true },
        { label: 'Annule', value: false },
        { label: 'En attente', value: false }

    ];

    constructor(
        private rendezvousservice: RendezvousService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.displayRendezvous();
    }

    displayRendezvous() {
        this.rendezvousservice.getAllRendezvous().subscribe((res) => {
            this.rendezvousList = res;
            console.log(this.rendezvousList);
            this.loading = false;
        });
    }

    selectRendezvous(rendezvous: any) {
        this.selectedRendezvous = rendezvous;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }

    changeStatusApointment(appointment: any, status: any) {
        this.confirmationService.confirm({
            message: 'Êtes-vous sûr de vouloir ' + (status == 'ACCEPTED' ? 'confirmer' : 'annuler') + ' ce rendez-vous de patient ' + appointment.patient.firstname + ' ' + appointment.patient.lastname + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                // this.messageService.add({
                //     severity: 'success',
                //     summary: 'Successful',
                //     detail: ' ',
                //     life: 3000
                // });
                this.updateRendezvous(appointment, status);
                
            }
        });
    }

    updateRendezvous(appointment: any, status: any) {
        this.rendezvousservice
            .updateRendezvous(
                appointment.id,
                status == 'ACCEPTED'
                    ? { 
                      acceptDate: new Date() ,
                      rejectDate: null

                    }
                    : {
                        acceptDate:null ,
                        rejectDate: new Date()
                      }
            )
            .subscribe((res: any) => {
                console.log(res);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Rendez-vous ' + status == 'ACCEPTED' ? 'confirmé' : 'annulé',
                    life: 3000
                });
                this.displayRendezvous();
            }, (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur lors de la mise à jour du rendez-vous',
                    life: 3000
                });
            });
    }



    reportDate(appointment: any) {
        this.appointement = appointment;
        this.appointementDate = new Date(appointment.date);
        this.visibleUpateAppointement = true;
    }
    
    updateAppointment() {
        this.rendezvousservice
            .updateRendezvous(
                this.appointement.id,
                {
                    date: this.appointementDate,
                    acceptDate:this.appointementDate ,
                    rejectDate: null
                }
            )
            .subscribe((res: any) => {
                console.log(res);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Rendez-vous mis à jour avec succès',
                    life: 3000
                });
                this.displayRendezvous();
                this.visibleUpateAppointement = false;
            }, (error) => {
                console.log(error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erreur lors de la mise à jour du rendez-vous',
                    life: 3000
                });
            });
    }
    
}

