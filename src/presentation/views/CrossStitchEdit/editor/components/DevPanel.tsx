'use client';
import { Slider } from '@components/ui';
import { useCrossStitchEditorContext } from '../CrossStitchEditorContext';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_SLIDER_STEP } from '../constants';
import { CrossStitchEditorActions } from '../crossStitchEditorReducer';

export const DevPanel = () => {
	const { state, dispatch } = useCrossStitchEditorContext();
	return (
		<div className="absolute bottom-0 right-0 w-48 p-2 bg-background border-t border-l">
			<div className="flex">
				<span className="text-center w-12">{state.scale.toFixed(1)}</span>
				<Slider
					value={[state.scale]}
					min={MIN_ZOOM}
					max={MAX_ZOOM}
					step={ZOOM_SLIDER_STEP}
					onValueChange={([scale]) =>
						dispatch(CrossStitchEditorActions.setScale(scale))
					}
				/>
			</div>
			{/* <div>
				<pre className="text-sm">{JSON.stringify(state, null, 2)}</pre>
			</div> */}
		</div>
	);
};
