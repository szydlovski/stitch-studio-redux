'use client';
import {
	Button,
	TabsList,
	TabsTrigger,
	ViewActions,
	ViewActionsGroup,
	ViewHeader,
} from '@components/ui';
import { WandSparklesIcon } from 'lucide-react';
import { CreateProductDialog } from './CreateProductDialog';

import { VIEW_MODE_CONFIG_MAP } from '../config';
import { ColumnVisibilityPopover } from './ColumnVisibilityPopover';
import { FiltersPopover } from './FiltersPopover';

export const CreateProductButton = () => {
	return (
		<CreateProductDialog>
			<Button className="flex gap-2">
				<WandSparklesIcon size={16} />
				<span className="hidden md:inline">Create product</span>
			</Button>
		</CreateProductDialog>
	);
};
