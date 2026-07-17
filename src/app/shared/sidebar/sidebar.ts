import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatTooltipModule, MatRippleModule, MatButtonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  isCollapsed = false;

  menuItems = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      route: '/home'
    },
    {
      title: 'Create KYC',
      icon: 'person_add',
      route: '/create'
    },
    {
      title: 'Search KYC',
      icon: 'manage_search',
      route: '/search'
    },
    {
      title: 'Update KYC',
      icon: 'edit_note',
      route: '/update'
    }
  ];

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    // Emit an event or use a service to update layout margin if necessary
    // For simplicity, we can use a class on the body or manage it via CSS
    if (this.isCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
  }

}
