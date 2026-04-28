import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export type HomeCardIcon = 'habitaciones' | 'pacientes';

@Component({
  selector: 'app-home-section-card',
  imports: [RouterModule],
  templateUrl: './home-section-card.component.html',
  styleUrl: './home-section-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSectionCardComponent {
  link = input.required<string>();
  title = input.required<string>();
  description = input.required<string>();
  cta = input.required<string>();
  icon = input.required<HomeCardIcon>();

  accentBorderClass = input<string>('hover:border-blue-200');
  accentOverlayClass = input<string>('from-blue-500/5 to-blue-600/5');
  accentIconBgClass = input<string>('bg-blue-100');
  accentIconColorClass = input<string>('text-blue-600');
  accentTextClass = input<string>('text-blue-600');
}
