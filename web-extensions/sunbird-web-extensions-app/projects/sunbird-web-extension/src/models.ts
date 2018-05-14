export const PluginConfig = (config) => {
  return (type) => {
    type._pluginConfig = config;
  };
};

export class PluginPlacement {
  public name;
  public priority;
  public component;
  constructor(options) {
    this.name = options.name;
    this.priority = options.priority;
    this.component = options.component;
  }
}

export class PluginData {
  public plugin;
  public placement;
  constructor(plugin, placement) {
    this.plugin = plugin;
    this.placement = placement;
  }
}
