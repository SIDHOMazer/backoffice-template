import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, MenuModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <span>MEDEXA</span>
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button #menuButton class="layout-topbar-menu-button layout-topbar-action" (click)="menu.toggle($event)">
                <i class="pi pi-user"></i>
            </button>

            <p-menu #menu [popup]="true" [model]="items"></p-menu>
        </div>
    </div>`
})
export class AppTopbar implements OnInit {
    items: MenuItem[] = [];

    constructor(public layoutService: LayoutService, private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Profile',
                icon: 'pi pi-user'
            },
            {
                separator: true
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    localStorage.removeItem('currentUser');
                    this.router.navigate(['/login']);
                }
            }
        ];
    }

    toggleDarkMode() {
        this.layoutService.toggleDarkMode();
    }
}
