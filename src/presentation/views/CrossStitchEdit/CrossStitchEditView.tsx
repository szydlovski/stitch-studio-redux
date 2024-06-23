import { View, ViewContent } from '@components/ui';
import { CrossStitchPatternData } from '@domain/cross-stitch';
import { CrossStitchEditor } from './editor/CrossStitchEditor';

export const CrossStitchEditView = ({
	patternData,
}: {
	patternData: CrossStitchPatternData;
}) => (
	<View>
		<ViewContent className="relative" fullWidth>
			<CrossStitchEditor patternData={patternData} />
		</ViewContent>
	</View>
);
