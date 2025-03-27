import { Component, OnInit, OnDestroy } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  template: '<div id="chartdiv" style="width: 100%; height: 500px;"></div>',
  styles: [`
    #chartdiv {
      width: 100%;
      height: 500px;
    }
  `]
})
export class SensorDonutComponent implements OnInit, OnDestroy {
  private root!: am5.Root;

  ngOnInit() {
    this.initChart();
  }

  private initChart(): void {
    // 1. Crear root
    this.root = am5.Root.new('chartdiv');

    // 2. Aplicar tema animado
    this.root.setThemes([am5themes_Animated.new(this.root)]);

    // 3. Crear gráfico
    const chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        innerRadius: am5.percent(50), // Donut al 50%
        layout: this.root.verticalLayout
      })
    );

    // 4. Configurar serie
    const series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: 'value',
        categoryField: 'category',
        alignLabels: false
      })
    );

    // 5. Estilo de etiquetas
    series.labels.template.setAll({
      textType: 'circular',
      centerX: 0,
      centerY: 0
    });

    // 6. Datos
    series.data.setAll([
      { value: 10, category: 'One' },
      { value: 9, category: 'Two' },
      { value: 6, category: 'Three' },
      { value: 5, category: 'Four' },
      { value: 4, category: 'Five' },
      { value: 3, category: 'Six' },
      { value: 1, category: 'Seven' }
    ]);

    // 7. Leyenda
    const legend = chart.children.push(
      am5.Legend.new(this.root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15
      })
    );
    legend.data.setAll(series.dataItems);

    // 8. Animación
    series.appear(1000, 100);
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }
}