import { Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'customer-bar-chart',
  templateUrl: './chart-d3.component.html',
})
export class ChartD3Component {
  @ViewChild('chart', { static: false }) chartContainer?: ElementRef;
  inputData: string = '';
  data: number[] = [];

  colorPalette = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336'];

  constructor(private snackBar: MatSnackBar) {}

  renderData() {
    this.data = this.inputData
      .split(',')
      .map((num) => Number(num.trim()))
      .filter((num) => !isNaN(num));

    if (this.data.length === 0) {
      this.showError('Please enter valid comma-separated numbers.');
    } else {
      this.createBarChart();
    }
  }

  createBarChart() {
    if (!this.chartContainer?.nativeElement) return;

    const element = this.chartContainer.nativeElement;
    const margin = { top: 20, right: 30, bottom: 20, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    d3.select(element).selectAll('*').remove();

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const y = d3
      .scaleBand()
      .domain(this.data.map((_, i) => i.toString()))
      .range([0, height])
      .padding(0.2);

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(this.data) ?? 0])
      .range([0, width])
      .nice();

    svg
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', (_, i) => y(i.toString())!)
      .attr('width', (d) => x(d))
      .attr('height', y.bandwidth())
      .attr('fill', (_, i) => {
        let color = this.colorPalette[i % this.colorPalette.length];
        if (i > 0 && color === this.colorPalette[(i - 1) % this.colorPalette.length]) {
          color = this.colorPalette[(i + 1) % this.colorPalette.length];
        }
        return color;
      });

    svg
      .selectAll('.bar-label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'bar-label')
      .attr('x', (d) => x(d) - 10)
      .attr('y', (_, i) => (y(i.toString()) ?? 0) + y.bandwidth() / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'end')
      .attr('fill', 'white')
      .text((d) => d);
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}
