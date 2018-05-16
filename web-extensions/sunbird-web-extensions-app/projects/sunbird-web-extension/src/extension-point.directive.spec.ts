import { Component, ViewContainerRef, ComponentFactoryResolver, EventEmitter, OnChanges } from '@angular/core';
import { PluginService, ExtensionPointDirective } from './index';
import { async, ComponentFixture, TestBed, inject, fakeAsync, tick  } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PluginConfig, PluginPlacement } from './models';
import { PluginData } from './models';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

// Wrapper Component for ExtensionPointDirective
@Component({
  template: `<extension-point name="dummy_placeholder"></extension-point>`
})
class TestWrapperComponent {
}

// Wrapper Component for ExtensionPointDirective
@Component({
  template: `<extension-point name="dummy_placeholder" override="true"></extension-point>`
})
class TestWrapperWithOverrideTrueComponent {
}

// Wrapper Component for ExtensionPointDirective
@Component({
  template: `<extension-point name="dummy_placeholder" [input]="someData" (output)="logThis($event)"></extension-point>`
})
class TestWrapperWithIOComponent {
  public someData = `{data: 'from TestWrapperWithIOComponent'}`;
  public logThis() {}
}

// Wrapper Component for ExtensionPointDirective
@Component({
  template: `<extension-point name="dummy_placeholder" [input]="someData | async" (output)="logThis($event)"></extension-point>`
})
class TestWrapperWithAsyncInputComponent implements OnChanges {
  public someData: Observable<any> = of({ data: 'from observable'}).pipe(delay(0));
  public logThis() {}
  ngOnChanges() {}
}

// Test component
@Component({
  template: `<p> Template works </p>`
})
class SomeTest1Component implements OnChanges {
  ngOnChanges() {}
}

// Test component
@Component({
  template: `<p> Template works </p>`
})
class SomeTest2Component implements OnChanges {
  ngOnChanges() {}
}

// Test Plugin
const DummyPluginConfig = {
  name: 'dummy plugin',
  placements: [
    new PluginPlacement({ name: 'dummy_placeholder', priority: 2, component: SomeTest1Component }),
    new PluginPlacement({ name: 'dummy_placeholder', priority: 20, component: SomeTest2Component })
  ]
};

@PluginConfig(DummyPluginConfig)
class DummyPlugin {}

describe('Directive: Extension Point', () => {
  let component: TestWrapperComponent;
  let fixture: ComponentFixture<TestWrapperComponent>;
  let directiveEl, directiveInstance;

  beforeEach(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SomeTest1Component, SomeTest2Component]
      }
    }).configureTestingModule({
      declarations: [TestWrapperComponent, ExtensionPointDirective, TestWrapperWithOverrideTrueComponent,
         SomeTest1Component, SomeTest2Component, TestWrapperWithIOComponent, TestWrapperWithAsyncInputComponent],
      providers: [ViewContainerRef, PluginService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperComponent);
    component = fixture.componentInstance;
    directiveEl = fixture.debugElement.query(By.directive(ExtensionPointDirective));
    directiveInstance = directiveEl.injector.get(ExtensionPointDirective);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(directiveEl).not.toBeNull();
    expect(directiveInstance.name).toBe('dummy_placeholder');
  });

  describe('on initialize', () => {
    it('should call pluginService to get pluginData', inject([PluginService], (pluginService: PluginService) => {
      spyOn(pluginService, 'getPluginData').and.returnValue([]);
      spyOn(directiveInstance, 'instantiatePluginComponent').and.returnValue(true);
      directiveInstance.initialize();
      expect(pluginService.getPluginData).toHaveBeenCalledWith('dummy_placeholder');
    }));

    it('should return when name directive property is undefined', inject([PluginService], (pluginService: PluginService) => {
      directiveInstance.name = undefined;
      spyOn(pluginService, 'getPluginData');
      spyOn(directiveInstance, 'instantiatePluginComponent');
      directiveInstance.initialize();
      expect(pluginService.getPluginData).not.toHaveBeenCalled();
      expect(directiveInstance.instantiatePluginComponent).not.toHaveBeenCalled();
    }));

    it('should sort the plugin based on priority and instantiate',
    inject([PluginService], (pluginService: PluginService) => {
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = [
        new PluginData(pluginData, pluginData.config.placements[0]),
        new PluginData(pluginData, pluginData.config.placements[1])
      ];
      spyOn(pluginService, 'getPluginData').and.returnValue(plugin);
      spyOn(directiveInstance, 'instantiatePluginComponent').and.returnValue(true);
      directiveInstance.initialize();
      expect(directiveInstance.instantiatePluginComponent).toHaveBeenCalledTimes(2);
      expect(directiveInstance.instantiatePluginComponent)
      .toHaveBeenCalledWith(plugin[0]);
      expect(directiveInstance.instantiatePluginComponent)
      .toHaveBeenCalledWith(plugin[1]);
    }));

    it('should instantiate highest priority component alone when override is set',
    inject([PluginService], (pluginService: PluginService) => {
      const fixture1 = TestBed.createComponent(TestWrapperWithOverrideTrueComponent);
      const directiveEl1 = fixture1.debugElement.query(By.directive(ExtensionPointDirective));
      const directiveInstance1 = directiveEl1.injector.get(ExtensionPointDirective);
      fixture1.detectChanges();
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = [
        new PluginData(pluginData, pluginData.config.placements[0]),
        new PluginData(pluginData, pluginData.config.placements[1])
      ];
      spyOn(pluginService, 'getPluginData').and.returnValue(plugin);
      spyOn(directiveInstance1, 'instantiatePluginComponent').and.returnValue(true);

      directiveInstance1.initialize();

      expect(directiveInstance1.instantiatePluginComponent).toHaveBeenCalledTimes(1);
      expect(directiveInstance1.instantiatePluginComponent)
      .toHaveBeenCalledWith(new PluginData(pluginData, pluginData.config.placements[0]));
    }));
  });

  describe('on instantiatePluginComponent', () =>  {
    it('should instantiate component and return componentRef', () => {
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = new PluginData(pluginData, pluginData.config.placements[0]);

      const componentRef = directiveInstance.instantiatePluginComponent(plugin);

      expect(componentRef).toBeDefined();
      expect(directiveInstance.componentRefs.length).toBe(1);
    });
    it('should bind directive input/output to the dynamic component', () => {
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = new PluginData(pluginData, pluginData.config.placements[0]);
      directiveInstance.input = `{ data: 'test data'}`;
      directiveInstance.output = new EventEmitter();
      directiveInstance.output.subscribe(data => {
        expect(data).toBe('event data from dynamic component');
      });
      const componentRef = directiveInstance.instantiatePluginComponent(plugin);
      componentRef.instance.output.emit('event data from dynamic component');
      expect(componentRef).toBeDefined();
      expect(componentRef.instance.input).toEqual(directiveInstance.input);
      expect(componentRef.instance.output instanceof EventEmitter).toBeTruthy();
      expect(directiveInstance.componentRefs.length).toBe(1);
      expect()
    });
  });

  describe('When NgOnchanges', () => {
    it('should update the input data of each component', fakeAsync(x => {
      const fixture1 = TestBed.createComponent(TestWrapperWithAsyncInputComponent);
      const directiveEl1 = fixture1.debugElement.query(By.directive(ExtensionPointDirective));
      fixture1.detectChanges();
      const directiveInstance1 = directiveEl1.injector.get(ExtensionPointDirective);
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = new PluginData(pluginData, pluginData.config.placements[0]);
      const componentRef = directiveInstance1.instantiatePluginComponent(plugin);
      spyOn(componentRef.instance, 'ngOnChanges').and.callThrough();
      spyOn(directiveInstance1, 'ngOnChanges').and.callThrough();

      fixture1.componentInstance.someData.subscribe(data => {
        fixture1.detectChanges();
        expect(componentRef.instance.input).toEqual({ data: 'from observable'});
        expect(directiveInstance1.ngOnChanges).toHaveBeenCalledTimes(1);
        expect(componentRef.instance.ngOnChanges).toHaveBeenCalledTimes(1);
      });
      tick(0);
    }));
  });

  describe('When NgOnDestroy', () => {
    it('should destroy dynamic components', () => {
      const fixture1 = TestBed.createComponent(TestWrapperComponent);
      const directiveEl1 = fixture1.debugElement.query(By.directive(ExtensionPointDirective));
      fixture1.detectChanges();
      const directiveInstance1 = directiveEl1.injector.get(ExtensionPointDirective);
      const pluginData = { type: DummyPlugin, config: DummyPluginConfig, instance: new DummyPlugin() };
      const plugin = new PluginData(pluginData, pluginData.config.placements[0]);
      const componentRef = directiveInstance1.instantiatePluginComponent(plugin);
      spyOn(directiveInstance1, 'ngOnDestroy').and.callThrough();
      spyOn(componentRef, 'destroy');
      spyOn(directiveInstance1.pluginChangeSubscription, 'unsubscribe');
      fixture1.destroy();
      expect(componentRef.destroy).toHaveBeenCalledTimes(1);
      expect(directiveInstance1.componentRefs.length).toBe(0);
      expect(directiveInstance1.pluginChangeSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});
