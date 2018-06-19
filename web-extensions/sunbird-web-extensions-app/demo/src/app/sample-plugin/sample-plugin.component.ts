import { Component, OnInit, Input, Inject, ViewContainerRef, EventEmitter, Output } from '@angular/core';
  // tslint:disable:max-line-length


@Component({
  selector: 'app-sample-plugin',
  template: `
  <br>
 <iframe src="https://stackblitz.com/edit/angular-5wiszx?embed=1&file=src/app/sample-plugin/sample-plugin.component.ts&hideExplorer=1&hideNavigation=1&view=preview" width="745px" height="400px" frameborder="0"></iframe>
  `,
  styleUrls: ['./sample-plugin.component.css'],
  providers: [],

})
export class SamplePluginComponent implements OnInit {
  isValid: boolean;
  isValid2: boolean;
  @Input()
  pluginName: string;

  @Output()
  passedPluginName: EventEmitter<Object> =  new EventEmitter();

  constructor() {
  }




  ngOnInit() {
  }

}
