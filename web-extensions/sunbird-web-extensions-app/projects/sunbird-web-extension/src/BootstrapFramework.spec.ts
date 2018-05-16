import { TestBed } from '@angular/core/testing';
import { PluginService } from './plugin-service';
import { BootstrapFramework } from './BootstrapFramework';
import { inject } from '@angular/core/testing';

describe('Bootstrap framework', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PluginService, BootstrapFramework]
    });
  });

  it('on initialize', inject([BootstrapFramework, PluginService],
    (bootstrapFramework: BootstrapFramework, pluginService: PluginService) => {
    const config = { plugins: [{ 'id': 'profile', 'ver': '1.0.0', 'module': 'TestAppModule', 'main': 'DummyPlugin' }] };
    spyOn(pluginService, 'loadPlugins');
    bootstrapFramework.initialize(config);
    expect(pluginService.loadPlugins).toHaveBeenCalledTimes(1);
    expect(pluginService.loadPlugins).toHaveBeenCalledWith(config);
  }));
});

