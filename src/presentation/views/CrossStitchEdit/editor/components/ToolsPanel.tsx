'use client';
import { Toggle } from '@components/ui/toggle';
import {
	EraserIcon,
	HandIcon,
	LucideIcon,
	MousePointer2Icon,
	PaintBucketIcon,
	PencilIcon,
} from 'lucide-react';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import {
	CrossStitchEditorActions,
	CrossStitchEditorTool,
} from '../crossStitchEditorReducer';
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui';

interface CrossStitchEditorToolConfig {
	label: string;
	value: CrossStitchEditorTool;
	icon: LucideIcon;
	disabled?: boolean;
}

const tools: CrossStitchEditorToolConfig[] = [
	{
		label: 'Move',
		value: CrossStitchEditorTool.Mouse,
		icon: HandIcon,
	},
	{
		label: 'Pencil',
		value: CrossStitchEditorTool.Pencil,
		icon: PencilIcon,
	},
	{
		label: 'Eraser',
		value: CrossStitchEditorTool.Eraser,
		icon: EraserIcon,
	},
	{
		label: 'Bucket',
		value: CrossStitchEditorTool.Bucket,
		icon: PaintBucketIcon,
		disabled: true,
	},
];

export const ToolsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute h-full top-0 left-0 p-1 bg-background border-b border-r rounded-br-lg grid gap-4">
			<div>
				<div className="grid gap-1">
					{tools.map(({ label, value, disabled, icon: Icon }) => (
						<Tooltip key={value}>
							<TooltipTrigger>
								<Toggle
									size="xs"
									key={value}
									disabled={disabled}
									pressed={state.tool === value}
									onPressedChange={() =>
										state.tool !== value &&
										dispatch(CrossStitchEditorActions.setTool(value))
									}
								>
									<Icon size={16} />
								</Toggle>
							</TooltipTrigger>
							<TooltipContent side="right">{label}</TooltipContent>
						</Tooltip>
					))}
				</div>
			</div>
		</div>
	);
};
