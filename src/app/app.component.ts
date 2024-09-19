import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="main-nav">
      <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
      <a routerLink="/map" routerLinkActive="active">Map View</a>
      <a routerLink="/equipment" routerLinkActive="active">Equipment List</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-nav {
      background-color: #1f1f1f;
      padding: 15px;
      display: flex;
      justify-content: space-around;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .main-nav a {
      color: #f9f9f9;
      text-decoration: none;
      font-weight: 500;
      font-size: 1.2rem;
    }
    .main-nav a.active {
      font-weight: 700;
      border-bottom: 2px solid #ff4081;
    }
    main {
      padding: 20px;
      background-color: #f5f5f5;
      min-height: calc(100vh - 60px);
    }
  `]
})
export class AppComponent {}
