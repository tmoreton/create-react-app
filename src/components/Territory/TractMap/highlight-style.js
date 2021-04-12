export function highlightTracts(tract) {
  tract.layers.splice( tract.layers.findIndex(layer => layer.id === 'GEOID'), 0,
    {
      id: 'data',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0,
      },
    },
    {
      id: 'data-filter',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
      },
      filter: ['in', 'GEOID', ''],
    },
    {
      id: 'income-lowest',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
        'fill-color': '#d83701',
      },
      filter: ['<', 'Median_Hou', 25000],
    },
    {
      id: 'income-low',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
        'fill-color': '#e9973d',
      },
      filter: [
        'all',
        ['>=', 'Median_Hou', 25000],
        ['<', 'Median_Hou', 50000],
      ],
    },
    {
      id: 'income-medium',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
        'fill-color': '#e2deb4',
      },
      filter: [
        'all',
        ['>=', 'Median_Hou', 50000],
        ['<', 'Median_Hou', 75000],
      ],
    },
    {
      id: 'income-high',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
        'fill-color': '#4ebca3',
      },
      filter: [
        'all',
        ['>=', 'Median_Hou', 75000],
        ['<', 'Median_Hou', 100000],
      ],
    },
    {
      id: 'income-highest',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 0.5,
        'fill-color': '#055b5e',
      },
      filter: ['>=', 'Median_Hou', 100000],
    },
    {
      id: 'data-selected',
      source: 'tracts',
      type: 'fill',
      interactive: true,
      paint: {
        'fill-opacity': 1,
      },
      filter: ['match', ['get', 'GEOID'], [1, 2, 3], true, false],
    }
  )
  return tract
}
