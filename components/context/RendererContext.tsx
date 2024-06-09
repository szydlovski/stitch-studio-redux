import {
	CrossStitchRenderer,
	loadStitchTextureDictionary,
} from '@/lib/cross-stitch';
import { TemplateRenderer } from '@/lib/template/TemplateRenderer';
import {
	etsyCoverTemplate,
	fabricMockupTemplate,
	flossMockupTemplate,
	frameCoverTemplate,
	frameMockupTemplate,
	loopMockupTemplate,
	pinterest1Template,
	squareCoverTemplate,
	wideCoverTemplate,
} from '@/brand/StitchFairyCo/cover/templates';
import { createContext, useContext, useEffect, useState } from 'react';

export interface RendererContextType {
	templateRenderer: TemplateRenderer;
	crossStitchRenderer: CrossStitchRenderer;
}

const RendererContext = createContext<RendererContextType>(undefined as any);

export const RendererProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [value, setValue] = useState<RendererContextType>();
	useEffect(
		() =>
			void (async () => {
				const stitchTextureDictionary = await loadStitchTextureDictionary();
				const crossStitchRenderer = new CrossStitchRenderer(
					stitchTextureDictionary
				);
				const templateRenderer = new TemplateRenderer();

				// TODO this is temp for StitchFairy
				await templateRenderer.preloadTemplateTextures(loopMockupTemplate);
				await templateRenderer.preloadTemplateTextures(flossMockupTemplate);
				await templateRenderer.preloadTemplateTextures(fabricMockupTemplate);
				await templateRenderer.preloadTemplateTextures(etsyCoverTemplate);
				await templateRenderer.preloadTemplateTextures(squareCoverTemplate);
				await templateRenderer.preloadTemplateTextures(wideCoverTemplate);
				await templateRenderer.preloadTemplateTextures(pinterest1Template);
				await templateRenderer.preloadTemplateTextures(frameMockupTemplate);
				await templateRenderer.preloadTemplateTextures(frameCoverTemplate);

				setValue({ templateRenderer, crossStitchRenderer });
			})(),
		[]
	);

	return value ? (
		<RendererContext.Provider value={value}>
			{children}
		</RendererContext.Provider>
	) : (
		<>Initializing renderer</>
	);
};

export const useRendererContext = () => {
	const context = useContext(RendererContext);
	if (!context) {
		throw new Error('useRendererContext must be used within a RendererContext');
	}
	return context;
};
