import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-nav',
  imports: [RouterModule],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarNavComponent {
  mobileOpen = input<boolean>(false);
  closeMobile = output<void>();

  sections = [
    { label: 'Habitaciones', route: '/habitaciones' },
    { label: 'Pacientes', route: '/pacientes' },
  ];

  onCloseMobile(): void {
    this.closeMobile.emit();
  }
}
