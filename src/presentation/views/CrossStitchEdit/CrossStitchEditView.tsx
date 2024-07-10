import { View, ViewContent } from '@components/ui';
import { CrossStitchPatternData } from '@domain/cross-stitch';
import { CrossStitchEditor } from './editor/CrossStitchEditor';

export const CrossStitchEditView = ({
	patternData,
}: {
	patternData: CrossStitchPatternData;
}) => (
	<View>
		<ViewContent fullWidth noPadding noScroll>
			{/* <div className='flex flex-1 h-full'>hello</div> */}
			<CrossStitchEditor patternData={patternData} />
		</ViewContent>
	</View>
);
