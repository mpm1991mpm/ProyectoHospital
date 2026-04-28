import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

export type HeaderIcon = 'home' | 'habitaciones' | 'pacientes';

@Component({
  selector: 'app-page-header',
  imports: [RouterModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  title = input.required<string>();
  icon = input<HeaderIcon>('home');
  iconColorClass = input<string>('text-blue-600');

  showBack = input<boolean>(false);
  backLink = input<string>('/');
  showMenuMobile = input<boolean>(false);

  primaryButtonLabel = input<string | null>(null);
  primaryButtonColorClass = input<string>('bg-blue-600 hover:bg-blue-700');

  secondaryButtonLabel = input<string | null>(null);

  primaryClick = output<void>();
  secondaryClick = output<void>();
  menuMobileClick = output<void>();

  onPrimaryClick(): void {
    this.primaryClick.emit();
  }

  onSecondaryClick(): void {
    this.secondaryClick.emit();
  }

  onMenuMobileClick(): void {
    this.menuMobileClick.emit();
  }
}
