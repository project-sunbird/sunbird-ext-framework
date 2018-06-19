import {
  Menu
} from './menu';


export const MENUS: Menu[] = [{
    id: 11,
    name: 'introduction',
    title: 'Introduction',
    subMenu: [{
      id: 21,
      name: 'portal',
      title: 'Brief introduction about the web extensions'
    }]
  },
  {
    id: 12,
    name: 'setup',
    title: 'Getting started',
    subMenu: [{
        id: 21,
        name: 'setup',
        title: 'Set up'
      },
      {
        id: 21,
        name: 'introduction-angular-6',
        title: 'Introduction Angular 6 library'
      }
    ]
  },
  {
    id: 13,
    name: 'build-plugin',
    title: 'Tutorials',
    subMenu: [
      {
        id: 21,
        name: 'build-plugin',
        title: 'How to build a plugin'
      },
      {
        id: 21,
        name: 'integrate-plugin-with-portal',
        title: 'Integrate a plugin with portal'
      },
      {
        id: 21,
        name: 'sample-plugin',
        title: 'Extend portal with sample plugin'
      }
    ]
  },
  {
    id: 13,
    name: 'pluggagble-ui-components',
    title: 'Plugin Architecture',
    subMenu: [
      {
        id: 21,
        name: 'pluggagble-ui-components',
        title: 'Pluggable UI components'
      }
    ]
  },
  {
    id: 14,
    name: 'api-docs',
    title: 'API docs',
    subMenu: [{
      id: 21,
      name: 'Integration Type Docs',
      title: 'Integrating Typedoc'
    }]
  },
  {
    id: 14,
    name: 'implementing-plugin-api',
    title: 'Additional Documentation',
    subMenu: [{
      id: 21,
      name: 'implementing-plugin-api',
      title: 'Implementing Plugin API'
    }
  ]
  },
  {
    id: 15,
    name: 'dev-guides',
    title: 'Developer guidelines',
    subMenu: [{
      id: 21,
      name: 'angular-guidance',
      title: 'Angular guidelines as is'
    }]
  },
];
