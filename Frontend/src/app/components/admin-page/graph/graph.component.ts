import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { GraphData } from './graphData';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
  chart: any;
  graphData = GraphData
  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['01-2023', '02-2023', '03-2023','04-2023',
								 '05-2023', '06-2023', '07-2023','08-2023',
                 '09-2023', '10-2023','11-2023','12-2023', ], 
          datasets: [
          {
            label: "Growth",
            data: [],
            borderColor: '',
            pointRadius: 0,
            type: 'line'
          },
          {
            label: " Orders",
            data: [100, 80, 60, 80, 20, 10, 30, 70, 
                  200, 50, 90, 150, 86, 24, 152],
            backgroundColor:'rgb(115, 169, 252)',
            type: 'bar'
          },
          {
            label: " Completed Orders",
            data: [90, 50, 30,  40, 20, 5, 15, 70,
                  180, 40, 60, 100, 80, 20, 150],
            backgroundColor: 'rgb(145, 219, 130)',
            type: 'bar'
          },
          {
            label: "Orders Denied",
            data: [],
            backgroundColor: 'rgb(255, 92, 92)',
            type: 'bar'
          } 
          
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });
  }
  updateGrowthData() {
    const completedOrdersData = this.chart.data.datasets[2].data;
  
    let sum = 0;
    for (let i = 0; i < completedOrdersData.length; i++) {
          
        sum += completedOrdersData[i];
      
        this.chart.data.datasets[0].data[i] = sum;
        
    }
    this.chart.update();
  }
  updateDeniedOrders(){
    const deniedOrdersData = this.chart.data.datasets[3].data;
    const completedOrdersData = this.chart.data.datasets[2].data;
    const totalOrdersData = this.chart.data.datasets[1].data;

    for (let i = 0; i < completedOrdersData.length; i++) {
      deniedOrdersData[i] = totalOrdersData[i]-completedOrdersData[i]
    }
    this.chart.update();
  }
  ngOnInit(): void {
    this.createChart();
    this.updateGrowthData();
    this.updateDeniedOrders()
  }
}