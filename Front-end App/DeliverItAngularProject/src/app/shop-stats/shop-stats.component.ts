import { Component } from '@angular/core';
import { Shop } from '../entities/shop.entity';
import { Product } from '../entities/product.entity';
import { StatsService } from '../services/stats.service';
import Plotly from 'plotly.js-dist'

type statsType = {
  totalSellAmount: number,
  topProducts: productStatsType[]
}

type productStatsType = {
    product: Product,
    amount: number
}

@Component({
  selector: 'app-shop-stats',
  templateUrl: './shop-stats.component.html',
  styleUrls: ['./shop-stats.component.scss']
})
export class ShopStatsComponent {

  protected shop: Shop;
  protected stats: statsType;
  protected date = new Date().toLocaleDateString('es-AR',{ year: 'numeric', month: 'long' })

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.shop = this.statsService.getShop()

    this.statsService.getStats().subscribe((response: any) => {
      this.stats = response.body

      let xValue = []
      let yValue = []
  
      this.stats.topProducts.forEach((element)=>{
        yValue.unshift(element.product.name)
        xValue.unshift(element.amount)
      })
      
      let data = [
        {
          x: xValue,
          y: yValue,
          text: xValue.map(String),
          type: 'bar',
          orientation: 'h',
          marker:{
            color: 'rgba(243,181,181,0.5)',
            width: 0.5
          }
        }
      ]
      
      const layout = {
        showlegend: false,
        xaxis: {
          title: 'Unidades',
        },
        font: {
          family: 'Arial',
          size: 13
        },
        margin:{
          t: 5,
          l: 110
        },
        legend: {
          font: {
            family: 'Arial',
            size: 11
          },
          itemwidth:10
        },
        paper_bgcolor: 'rgb(245,245,245)',
        plot_bgcolor: 'rgb(245,245,245)',
      }
      
      Plotly.newPlot('barChart', data, layout, {staticPlot: true, responsive: true})
    })
  }

}