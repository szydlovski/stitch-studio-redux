'use client';

import { gridConfig, listConfig } from './modes';
import { ProductsViewMode, ViewModeConfig } from './types';

export const VIEW_MODE_CONFIG_MAP: Record<ProductsViewMode, ViewModeConfig> = {
	[ProductsViewMode.Grid]: gridConfig,
	[ProductsViewMode.List]: listConfig,
};
