import {
  Directive, Input, Inject, Provider, ViewContainerRef,
  ComponentFactoryResolver, OnDestroy, OnChanges, EventEmitter, Output, OnInit, ComponentRef, Injector
} from '@angular/core';
import { PluginData } from './models';
import { PluginService } from './plugin-service';
import { Subscription } from 'rxjs';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'extension-point'
})
export class ExtensionPointDirective implements OnInit, OnChanges, OnDestroy {
  @Input() name: string;
  @Input() override: Boolean = false;
  @Input() input: any;
  @Output() output: EventEmitter<any> = new EventEmitter();
  public viewContainerRef: ViewContainerRef;
  public componentResolver: ComponentFactoryResolver;
  public pluginService: PluginService;
  public componentRefs: Array<any> = [];
  public pluginChangeSubscription: Subscription;

  constructor(viewContainerRef: ViewContainerRef, componentResolver: ComponentFactoryResolver,
    pluginService: PluginService) {
    this.viewContainerRef = viewContainerRef;
    this.componentResolver = componentResolver;
    this.pluginService = pluginService;
    this.pluginChangeSubscription = this.pluginService.change.subscribe(x => this.initialize());
  }

  ngOnInit() {
    this.initialize();
  }

  public initialize() {
    if (!this.name) {
      return;
    }
    const pluginData = this.pluginService.getPluginData(this.name);
    if (this.override) {
      pluginData.sort((a, b) => a.placement.priority > b.placement.priority ? 1 : a.placement.priority < b.placement.priority ? -1 : 0);
      return this.instantiatePluginComponent(pluginData.shift());
    } else {
      pluginData.sort((a, b) => a.placement.priority > b.placement.priority ? 1 : a.placement.priority < b.placement.priority ? -1 : 0);
      return Promise.all(pluginData.map(plugin => this.instantiatePluginComponent(plugin)));
    }
  }

  public instantiatePluginComponent(pluginData: PluginData): ComponentRef<any> {
    if (!pluginData) {
      return;
    }
    const componentFactory = this.componentResolver.resolveComponentFactory(pluginData.placement.component);
    const contextInjector = this.viewContainerRef.parentInjector;
    const providers = [{ provide: PluginData, useValue: pluginData }];
    const childInjector = Injector.create({ providers, parent: contextInjector });
    const componentRef: any = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, childInjector);
    componentRef.instance.input = this.input;
    componentRef.instance.output = componentRef.instance.output || new EventEmitter();
    componentRef.instance.output.subscribe(childComponentEvent => this.output.emit(childComponentEvent));
    this.componentRefs.push(componentRef);
    componentRef.changeDetectorRef.markForCheck();
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  ngOnChanges() {
    if (this.componentRefs.length > 0) {
      this.componentRefs.forEach(componentRef => {
        componentRef.instance.input = this.input;
        return componentRef.instance.ngOnChanges ? componentRef.instance.ngOnChanges() : undefined;
      });
    }
  }

  ngOnDestroy() {
    if (this.componentRefs.length > 0) {
      this.componentRefs.forEach(componentRef => componentRef.destroy());
      this.componentRefs = [];
    }
    this.pluginChangeSubscription.unsubscribe();
  }
}
