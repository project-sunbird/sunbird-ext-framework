import {Directive, Input, Inject, Provider, ViewContainerRef, ComponentFactoryResolver, ReflectiveInjector} from '@angular/core';
import {PluginData} from './models';
import {PluginService} from './plugin-service';

@Directive({
  selector: 'ngc-plugin-slot'
})
export class NgcPluginSlotDirective {
  @Input() name;
  public viewContainerRef
  public componentResolver
  public pluginService
  public componentRefs
  public pluginChangeSubscription

  constructor(@Inject(ViewContainerRef) viewContainerRef, @Inject(ComponentFactoryResolver) componentResolver, @Inject(PluginService) pluginService) {
    this.viewContainerRef = viewContainerRef;
    this.componentResolver = componentResolver;
    this.pluginService = pluginService;
    this.componentRefs = [];
    this.pluginChangeSubscription = this.pluginService.change.subscribe(() => this.initialize());
  }

  initialize() {
    if (!this.name) {
      return;
    }

    if (this.componentRefs.length > 0) {
      this.componentRefs.forEach((componentRef) => componentRef.destroy());
      this.componentRefs = [];
    }

    const pluginData = this.pluginService.getPluginData(this.name);
    pluginData.sort((a, b) => a.placement.priority < b.placement.priority ? 1 : a.placement.priority > b.placement.priority ? -1 : 0);

    return Promise.all(pluginData.map((pluginData) => this.instantiatePluginComponent(pluginData)));
  }

  instantiatePluginComponent(pluginData) {
    let componentFactory = this.componentResolver.resolveComponentFactory(pluginData.placement.component)
    const contextInjector = this.viewContainerRef.parentInjector;
    const providers = [
      { provide: PluginData, useValue: pluginData }
    ];
    const childInjector = ReflectiveInjector.resolveAndCreate(providers, contextInjector);
    const componentRef = this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length, childInjector);
    this.componentRefs.push(componentRef);
    componentRef.changeDetectorRef.markForCheck();
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }

  ngOnChanges() {
    this.initialize();
  }

  ngOnDestroy() {
    this.pluginChangeSubscription.unsubscribe();
  }
}
