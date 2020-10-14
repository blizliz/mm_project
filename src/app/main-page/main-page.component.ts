import { Component, OnInit } from '@angular/core';

import { default as chapterData1 } from '../data/data_1.json';
import { default as chapterData2 } from '../data/data_2.json';
import { default as chapterData15 } from '../data/data_15.json';
import { default as chapterData19 } from '../data/data_19.json';
import { default as chapterData23 } from '../data/data_23.json';
import { default as chapterData25 } from '../data/data_25.json';

const CHAPTERS = [1, 2, 15, 19, 23, 25];
declare var require: any;


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  // tabs = ['1 глава', '2 глава', '15 глава', '19 глава', '23 глава', '25 глава'];
  tabs = [];
  data; layout;
  data1; data2; data15; data19; data23; data25;
  layout1; layout2; layout15; layout19; layout23; layout25;
  emotions = ['радость', 'доверие', 'страх', 'удивление', 'грусть', 'неудовольствие', 'злость', 'ожидание'];
  colors = ['rgb(253, 233, 43)', 'rgb(178, 205, 65)', 'rgb(1, 158, 83)', 'rgb(1, 168, 222)', 'rgb(0, 131, 191)',
            'rgb(170, 72, 148)', 'rgb(235, 45, 47)', 'rgb(243, 159, 43)'];

  constructor() {
    for (const chapter of CHAPTERS) {
      this.tabs.push(chapter + ' глава');
    }
  }

  ngOnInit(): void {
    this.renderPlots();
  }

  getDataForPlots(chapterData) {
    const data = [];
    const layout = {
      paper_bgcolor: 'rgba(0, 0, 0, 0)',
      height: 700,
      width: 1200,
      grid: {
        rows: 2,
        columns: 3
      },
      annotations: [],
      images: [{
        source: require('src/assets/images/voland.jpg'),
        x: 0,
        y: 1
      }]
    };
    let i = 0;
    let xc;
    let yc;
    const width = 0.1;
    const height = 0.8;
    for (const character of chapterData) {
      const calc = Math.floor(i / 3);
      const name = Object.keys(character)[0];
      const emotionPercents = [];
      for (const emotion of this.emotions) {
        emotionPercents.push(character[name][emotion] * 100);
      }
      if (i === 0) {
        xc = [0, 0.33];
        yc = [0.52, 1];
      } else if (i === 1) {
        xc = [0.33, 0.66];
        yc = [0.52, 1];
      } else if (i === 2) {
        xc = [0.66, 1];
        yc = [0.52, 1];
      } else if (i === 3) {
        xc = [0, 0.33];
        yc = [0, 0.48];
      } else if (i === 4) {
        xc = [0.33, 0.66];
        yc = [0, 0.48];
      }
      data.push(
        {
          values: emotionPercents,
          labels: this.emotions,
          type: 'pie',
          // domain: {
          //   rows: calc,
          //   column: i % 3
          // },
          domain: {
            x: xc,
            y: yc
          },
          marker: {
            colors: this.colors
          },
          hoverinfo: 'label+percent',
          hole: .6,
        }
      );
      layout['annotations'].push(
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: name,
          x: width + (i % 3) * 0.39,
          y: height - calc * 0.57
        }
      );
      i += 1;
    }
    return [data, layout];
  }

  renderPlots() {
    const tmp1 = this.getDataForPlots(chapterData1);
    this.data1 = tmp1[0];
    this.layout1 = tmp1[1];

    const tmp2 = this.getDataForPlots(chapterData2);
    this.data2 = tmp2[0];
    this.layout2 = tmp2[1];

    const tmp15 = this.getDataForPlots(chapterData15);
    this.data15 = tmp15[0];
    console.log(this.data15);
    this.layout15 = tmp15[1];

    const tmp19 = this.getDataForPlots(chapterData19);
    this.data19 = tmp19[0];
    this.layout19 = tmp19[1];

    const tmp23 = this.getDataForPlots(chapterData23);
    this.data23 = tmp23[0];
    this.layout23 = tmp23[1];

    const tmp25 = this.getDataForPlots(chapterData25);
    this.data25 = tmp25[0];
    this.layout25 = tmp25[1];
  }
}
