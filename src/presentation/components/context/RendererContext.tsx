import {
	etsyCoverTemplate,
	fabricMockupTemplate,
	flossMockupTemplate,
	frameCoverTemplate,
	frameMockupTemplate,
	hoopMockupTemplate,
	pinterest1Template,
	squareCoverTemplate,
	wideCoverTemplate,
} from '@brand/StitchFairyCo/cover/templates';
import {
	CrossStitchPatternRenderer,
	loadStitchTextureDictionary,
} from '@infrastructure/cross-stitch';
import {
	Template,
	Renderer,
} from '@infrastructure/product-image/template-engine';
import { createContext, useContext, useEffect, useState } from 'react';

export interface RendererContextType {
	templateRenderer: Renderer;
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
				const templateRenderer = new Renderer();

				const load =
					templateRenderer.loadTemplateTextures.bind(templateRenderer);

				// TODO this is temp for StitchFairy
				await load(new Template(hoopMockupTemplate));
				await load(new Template(flossMockupTemplate));
				await load(new Template(fabricMockupTemplate));
				await load(new Template(etsyCoverTemplate));
				await load(new Template(squareCoverTemplate));
				await load(new Template(wideCoverTemplate));
				await load(new Template(pinterest1Template));
				await load(new Template(frameMockupTemplate));
				await load(new Template(frameCoverTemplate));

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
