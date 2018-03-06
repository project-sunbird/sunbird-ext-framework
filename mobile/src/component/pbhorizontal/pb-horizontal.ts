import { Component, Input } from '@angular/core';

@Component({
  selector: 'pb-horizontal',
  templateUrl: 'pb-horizontal.html',
  styleUrls: [
  	'pb-horizontal.scss'
  ]
})
export class PBHorizontal {

  @Input('progress') progress;

  constructor() {

  }

}