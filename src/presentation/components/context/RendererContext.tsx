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
import {
	CrossStitchPatternRenderer,
	loadStitchTextureDictionary,
} from '@infrastructure/cross-stitch';
import { ImageTemplateRenderer } from '@infrastructure/product-image/ImageTemplateRenderer';
import { createContext, useContext, useEffect, useState } from 'react';

export interface RendererContextType {
	templateRenderer: ImageTemplateRenderer;
	crossStitchRenderer: CrossStitchPatternRenderer;
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
				const crossStitchRenderer = new CrossStitchPatternRenderer(
					stitchTextureDictionary
				);
				const templateRenderer = new ImageTemplateRenderer();

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

	if (!value) return null;

	return (
		<RendererContext.Provider value={value}>
			{children}
		</RendererContext.Provider>
	);
};

export const useRendererContext = () => {
	const context = useContext(RendererContext);
	if (!context) {
		throw new Error('useRendererContext must be used within a RendererContext');
	}
	return context;
};
