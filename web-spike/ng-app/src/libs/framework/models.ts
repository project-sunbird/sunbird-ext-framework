function PluginConfig(config) {
  return (type) => {
    type._pluginConfig = config;
  };
}

class PluginPlacement {
  public slot
  public priority
  public component
  constructor(options) {
    this.slot = options.slot;
    this.priority = options.priority;
    this.component = options.component;
  }
}

class PluginData {
  public plugin
  public placement
  constructor(plugin, placement) {
    this.plugin = plugin;
    this.placement = placement;
  }
}

export { PluginConfig, PluginPlacement, PluginData }