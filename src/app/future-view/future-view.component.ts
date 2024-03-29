import {Component, ViewChild} from '@angular/core';
import {Future, ListingHistory} from "../model/model";
import {ActivatedRoute} from "@angular/router";
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartType} from "chart.js";
import {FutureService} from "../service/future.service";

@Component({
  selector: 'app-forex-view',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './future-view.component.html',
  styleUrl: './future-view.component.css'
})
export class FutureViewComponent {
  future: Future | null = null;
  @ViewChild(BaseChartDirective)
  chart: BaseChartDirective | undefined;
  futureHistory: ListingHistory[] = [];
  futureId: number = 0;
  graphFilter: "d" | "m" | "y" | "5y" | "all" = "d";

  chartData: ChartConfiguration["data"] = {
    datasets: [
      {
        data: [],
        label: 'Forex price history',
        fill: "origin"
      }
    ],
    labels: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"],
  }
  lineChartType: ChartType = 'line';
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true
  }

  constructor(private futureService: FutureService, private route: ActivatedRoute) {
    this.route.params.subscribe(params =>
      this.futureId = params["ticker"]
    )
  }

  refresh() {
    this.ngOnInit().then();
  }

  async ngOnInit() {
    this.future = await this.futureService.getFutureById(this.futureId);
    debugger;
    await this.handleGraphFilter("d");
  }

  async handleGraphFilter(input: "d" | "m" | "y" | "5y" | "all") {
    this.graphFilter = input;
    let date = new Date();
    let graphFilterValue: number | null = null;
    switch(input) {
      case "d":
        date.setDate(date.getDate() - 1)
        graphFilterValue = Math.floor(date.getTime() / 1000);
        this.chartData.labels = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "23:59"]
        this.chart?.chart?.update()
        break;
      case "m":
        date.setMonth(date.getMonth() - 1)
        graphFilterValue = Math.floor(date.getTime() / 1000);
        this.chartData.labels = ["1.", "5.", "10.", "15.", "20.", "25.", "30."]
        this.chart?.chart?.update()
        break;
      case "y":
        date.setFullYear(date.getFullYear() - 1)
        graphFilterValue = Math.floor(date.getTime() / 1000);
        this.chartData.labels = ['January', 'March', 'June', 'September', "December"]
        break;
      case "5y":
        date.setFullYear(date.getFullYear() - 5)
        graphFilterValue = Math.floor(date.getTime() / 1000);
        this.chartData.labels = [date.getFullYear(), date.getFullYear() + 1, date.getFullYear() + 2, date.getFullYear() + 3, date.getFullYear() + 4, date.getFullYear() + 5]
        break;
      case "all":
        graphFilterValue = null
        this.chartData.labels = [date.getFullYear() - 10, date.getFullYear() - 9, date.getFullYear()  - 8, date.getFullYear() - 7, date.getFullYear() - 6, date.getFullYear() - 5, date.getFullYear() - 4, date.getFullYear() - 3, date.getFullYear() - 2, date.getFullYear() - 1, date.getFullYear()]
        break;
    }

    this.futureHistory = await this.futureService.getFutureHistory(this.futureId, graphFilterValue, null);
    this.generateChartData();
  }

  generateChartData() {
    this.chartData.datasets[0].data = [];
    for(let listingHistory of this.futureHistory) {
      //this.dps.push({y: stockHistory.price})
      this.chartData.datasets[0].data.push(listingHistory.price)
    }
    this.chart?.chart?.update();
  }
}
