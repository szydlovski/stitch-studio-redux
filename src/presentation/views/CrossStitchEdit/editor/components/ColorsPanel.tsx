'use client';
import { cn } from '@/lib';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import { CrossStitchEditorActions } from '../crossStitchEditorReducer';

export const ColorsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute top-0 right-0 p-2 bg-background border-b border-l rounded-bl-lg grid gap-4">
			<div className="grid gap-2">
				{state.colors.map(({ name, color }, idx) => (
					<div
						key={color}
						className={cn('flex gap-1', {
							'pl-2 border-l-2 border-blue-500': idx === state.activeColor,
						})}
					>
						<button
							onClick={() =>
								idx !== state.activeColor &&
								dispatch(CrossStitchEditorActions.setActiveColor(idx))
							}
							className="w-8 h-8 rounded-md"
							style={{ backgroundColor: color }}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
