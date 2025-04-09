// Bibliotecas Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Rotas
import { RouterModule } from '@angular/router';

// Componentes
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class LayoutModule { }
