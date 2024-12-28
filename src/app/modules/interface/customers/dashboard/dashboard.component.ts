import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  visible: boolean = false;
  showModal: boolean = false;

  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Saldo Capital',
          data: [150000, 120000, 90000, 0],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        },
        {
          label: 'Abono',
          data: [30000, 30000, 30000, 90000],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--pink-500'),
          tension: 0.4
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };

  }

  showDialog() {
    this.showModal = true;
    const overlay = document.createElement('div');
    overlay.className = 'p-component-overlay p-sidebar-mask p-component-overlay-enter';
    overlay.style.zIndex = '1101';

    // Asegúrate de no agregar múltiples overlays
    document.body.appendChild(overlay);
    // if (!document.querySelector('.p-component-overlay.p-sidebar-mask')) {
    // }
  }

  closeSidebar() {
    this.visible = false;
    const overlay = document.querySelector('.p-sidebar-mask');
    if (overlay) {
      overlay.remove();
    }
  }

  showSidebar() {
    this.visible = true;
  }

  pagos = [
    {
      id: 'abcw2',
      fecha: '2021-09-01',
      valor: 30000,
      capital: 150000,
    },
    {
      id: 'abcw3',
      fecha: '2021-10-01',
      valor: 30000,
      capital: 120000,
    },
    {
      id: 'abcw4',
      fecha: '2021-11-01',
      valor: 30000,
      capital: 90000,
    },
    {
      id: 'abcw5',
      fecha: '2021-12-01',
      valor: 90000,
      capital: 0,
    }
  ]

}
