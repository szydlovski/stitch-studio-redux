'use client';
import { cn } from '@lib/utils';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import { CrossStitchEditorActions } from '../crossStitchEditorReducer';

export const ColorsPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute top-0 right-0 p-2 bg-background border-b border-l rounded-bl-lg grid gap-4">
			<div className="grid gap-2">
				{state.colors.map(({ id, name, color }) => (
					<div
						key={id}
						className={cn('flex gap-1', {
							'pl-2 border-l-2 border-blue-500': id === state.activeColor,
						})}
					>
						<button
							onClick={() =>
								id !== state.activeColor &&
								dispatch(CrossStitchEditorActions.setActiveColor(id))
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
