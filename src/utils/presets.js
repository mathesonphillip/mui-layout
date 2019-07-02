export const createDefaultLayout = config => ({
  navWidth: 256,
  navAnchor: 'left',
  navVariant: {
    xs: 'temporary',
    sm: 'permanent',
  },
  collapsible: {
    xs: false,
    sm: true,
  },
  collapsedWidth: 64,
  clipped: false,
  headerPosition: 'relative',
  squeezed: false,
  footerShrink: true,
  ...config,
});

export const createFixedLayout = config => ({
  ...createDefaultLayout(),
  navVariant: {
    xs: 'temporary',
    md: 'permanent',
  },
  collapsible: {
    xs: false,
    md: true,
  },
  clipped: true,
  squeezed: true,
  headerPosition: 'sticky',
  ...config,
});

export const createContentBasedLayout = config => ({
  ...createDefaultLayout(),
  navWidth: {
    sm: 200,
    md: 256,
  },
  navVariant: {
    xs: 'temporary',
    sm: 'persistent',
  },
  collapsible: false,
  ...config,
});

export const createCozyLayout = config => ({
  ...createDefaultLayout(),
  navVariant: {
    xs: 'persistent',
    sm: 'permanent',
  },
  navWidth: {
    sm: 200,
    md: 256,
    xs: 64,
  },
  collapsible: {
    xs: false,
    sm: true,
  },
  clipped: false,
  ...config,
});

export const createMuiTreasuryLayout = config => ({
  ...createDefaultLayout(),
  navWidth: 200,
  navVariant: {
    xs: 'temporary',
    md: 'permanent',
  },
  clipped: true,
  collapsible: false,
  ...config,
});