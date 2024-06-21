'use client';
import { Toggle } from '@components/ui/toggle';
import {
	EraserIcon,
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

interface CrossStitchEditorToolConfig {
	value: CrossStitchEditorTool;
	icon: LucideIcon;
	disabled?: boolean;
}

const tools: CrossStitchEditorToolConfig[] = [
	{ value: CrossStitchEditorTool.Mouse, icon: MousePointer2Icon },
	{ value: CrossStitchEditorTool.Pencil, icon: PencilIcon },
	{ value: CrossStitchEditorTool.Eraser, icon: EraserIcon },
	{
		value: CrossStitchEditorTool.Bucket,
		icon: PaintBucketIcon,
		disabled: true,
	},
];

export const ToolsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute top-0 left-0 p-1 bg-background border-b border-r rounded-br-lg grid gap-4">
			<div className="grid gap-1">
				{tools.map(({ value, disabled, icon: Icon }) => (
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
				))}
			</div>
		</div>
	);
};
