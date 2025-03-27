import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  breadcrumbs: Array<{label: string, path: string}> = [];
  currentPageTitle: string = '';
  searchQuery: string = '';
  unreadNotifications: number = 3; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      this.currentPageTitle = this.breadcrumbs[this.breadcrumbs.length - 1]?.label || 'Dashboard';
    });
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{label: string, path: string}> = []): Array<{label: string, path: string}> {
    if (!route.routeConfig) return breadcrumbs;

    const routeURL: string = route.routeConfig.path ? route.routeConfig.path : '';
    const nextUrl: string = url + `/${routeURL}`;
    const label = route.routeConfig.data?.['breadcrumb'] || route.routeConfig.path || '';

    if (label) {
      breadcrumbs.push({
        label: label,
        path: nextUrl
      });
    }

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, breadcrumbs);
    }

    return breadcrumbs;
  }


  onSearch() {
    // Tu lógica de búsqueda existente
    console.log('Búsqueda:', this.searchQuery);
  }

  logout() {
    console.log('Cerrar sesión');
  }

  toggleMobileMenu() {
    console.log('Toggle mobile menu');
  }

  openNotifications() {
    console.log('Abrir notificaciones');
  }
}