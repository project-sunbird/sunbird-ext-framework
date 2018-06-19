import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-codeblock',
  template: `<pre class="code ui black message javascript"><ng-content></ng-content></pre>`
})

export class CodeblockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

