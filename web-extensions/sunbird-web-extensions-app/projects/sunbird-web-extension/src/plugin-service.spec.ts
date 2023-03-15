import { TestBed, inject } from '@angular/core/testing';
import { PluginService } from './plugin-service';
import { ReplaySubject } from 'rxjs';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { PluginConfig, PluginPlacement, PluginData } from './models';

// Test Component
@Component({
  template: `<p> App works </p>`
})
class TestWrapperComponent {
}

// Test Plugin
const DummyPluginConfig = {
  name: 'dummy plugin',
  placements: [
    new PluginPlacement({ name: 'dummy_placeholder', priority: 2, component: TestWrapperComponent })
  ]
};

// Test Module
@NgModule({
    imports: [],
    declarations: [TestWrapperComponent]
})
class TestAppModule { }


@PluginConfig(DummyPluginConfig)
class DummyPlugin { }

describe('Plugin service', () => {
  const frameworkConfig = {
    plugins: [{
      'id': 'profile',
      'ver': '1.0.0',
      'module': TestAppModule,
      'main': DummyPlugin
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginService]
    });
  });

  it('should create', inject([PluginService], (pluginService: PluginService) => {
    expect(pluginService.change instanceof ReplaySubject).toBeTruthy();
    expect(pluginService.plugins.length).toBe(0);
  }));

  describe('loadPlugins method', () => {
    it('should load plugins from config', inject([PluginService], (pluginService: PluginService) => {
      spyOn(pluginService, 'loadPlugin');
      pluginService.loadPlugins(frameworkConfig);
      expect(pluginService.loadPlugin).toHaveBeenCalledTimes(1);
      expect(pluginService.loadPlugin).toHaveBeenCalledWith(DummyPlugin);
    }));

    it('should throw error when invalid config', inject([PluginService], (pluginService: PluginService) => {
      const invalidConfig1 = {
        plugins: {}
      };
      expect(() => {
        pluginService.loadPlugins(invalidConfig1);
      }).toThrowError('invalid framework configuration! Failed to load plugins!');

      const invalidConfig2 = {};
      expect(() => {
        pluginService.loadPlugins(invalidConfig1);
      }).toThrowError('invalid framework configuration! Failed to load plugins!');

      const invalidConfig3 = undefined;
      expect(() => {
        pluginService.loadPlugins(invalidConfig1);
      }).toThrowError('invalid framework configuration! Failed to load plugins!');
    }));
  });

  describe('getPluginData method', () => {
    it('should get pluginData', inject([PluginService], (pluginService: PluginService) => {
      pluginService.plugins = [];
      pluginService.loadPlugins(frameworkConfig);
      const plugin: Array<PluginData> = pluginService.getPluginData('dummy_placeholder');
      plugin.forEach(instance => {
        expect(instance.placement instanceof PluginPlacement).toBeTruthy();
        expect(instance.plugin).toEqual(pluginService.plugins.find(x => x.type === DummyPlugin));
      });
    }));
  });

  describe('loadPlugin Method', () => {
    it('should emit plugin add event', inject([PluginService], (pluginService: PluginService) => {
      spyOn(pluginService.change, 'next');
      pluginService.loadPlugin(DummyPlugin);
      expect(pluginService.change.next).toHaveBeenCalledTimes(1);
      expect(pluginService.change.next).toHaveBeenCalledWith(pluginService.plugins);
    }));
  });

  describe('removePlugin method', () => {
    it('should remove specified plugin', inject([PluginService], (pluginService: PluginService) => {
      pluginService.plugins = [];
      pluginService.loadPlugin(DummyPlugin);
      spyOn(pluginService.change, 'next');
      pluginService.removePlugin('dummy plugin');
      expect(pluginService.plugins.length).toBe(0);
      expect(pluginService.change.next).toHaveBeenCalledWith([]);
      expect(pluginService.change.next).toHaveBeenCalledTimes(1);
    }));
  });
});
