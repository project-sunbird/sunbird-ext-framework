import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public menu: any;
  ngOnInit(): void {
    this.menu = {
      items: [{
        id: "org.ekstep.plugin",
        name: "profile",
        routePath: "profile",
        onclick: "org.ekstep.plugin:homeClicked"
      }]
    }
  }
}
