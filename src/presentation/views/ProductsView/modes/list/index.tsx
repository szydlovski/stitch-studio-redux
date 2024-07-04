'use client';
import { Rows3Icon } from 'lucide-react';

import { ViewModeConfig } from '../../types';
import { ListModeContent } from './ListModeContent';

export const listConfig: ViewModeConfig = {
	icon: Rows3Icon,
	Content: ListModeContent,
	Loading: () => {
		return <span>loading</span>;
	},
};
