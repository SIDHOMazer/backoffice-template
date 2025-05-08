import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];
    currentUser: any;

    ngOnInit() {
        // Get current user from localStorage
        const userStr = localStorage.getItem('currentUser');
        this.currentUser = userStr ? JSON.parse(userStr) : null;
        
        const isAdmin = this.currentUser?.role === 'ADMIN';

        const userMenuItems = [
            ...(isAdmin ? [
                { label: 'Doctor', icon: 'pi pi-fw pi-user', routerLink: ['/backoffice/doctor'] },
                { label: 'Admin', icon: 'pi pi-fw pi-user', routerLink: ['/backoffice/admin'] },
            ] : []),
            { label: 'Patient', icon: 'pi pi-fw pi-user', routerLink: ['/backoffice/patient'] },
        ];

        this.model = [
            {
                label: 'USER',
                items: userMenuItems
            },
            {
                label: 'HOME',
                items: [
                    { label: 'rendezvous', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/rendezvous'] },
                    { label: 'Report', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/rapport/null'] },
                    { label: 'facture', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/facture'] },
                    { label: 'medicament', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/medicament'] },
                    { label: 'exercice', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/exercice'] },
                    { label: 'testDeSante', icon: 'pi pi-fw pi-pencil', routerLink: ['/backoffice/testDeSante'] },
                ]
            },
            {
                label: 'PLAN',
                items: [
                    { label: 'planDeTraitement', icon: 'pi pi-fw pi-clipboard', routerLink: ['/backoffice/planDeTraitement'] },
                    { label: 'exercicePlan', icon: 'pi pi-fw pi-clipboard', routerLink: ['/backoffice/exercicePlan'] },
                    { label: 'medicamentplan', icon: 'pi pi-fw pi-clipboard', routerLink: ['/backoffice/medicamentplan'] },
                    { label: 'testDeSanteplan', icon: 'pi pi-fw pi-clipboard', routerLink: ['/backoffice/testDeSanteplan'] },
                ]
            }
        ];
    }
}
