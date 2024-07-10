import {
	LayerType,
	TemplateManifest,
	TemplatePropType,
} from '@infrastructure/product-image/template-engine';

export const hoopMockupTemplate: TemplateManifest = {
	id: 'StitchFairyCo-hoopMockup',
	name: 'Hoop mockup',
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'patternRender',
		},
	],
	dimensions: {
		width: 1100,
		height: 1180,
	},
	layers: [
		{
			id: 'patternRender',
			name: 'Pattern render',
			type: LayerType.TextureProp,
			propName: 'patternRender',
			x: 26,
			y: 107,
			width: 1050,
			height: 1050,
			mask: {
				id: 'patternMask',
				name: 'Pattern mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/loop_mockup/loop_mask.png',
			},
		},
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/loop_mockup/loop_texture.png',
		},
	],
};

export const frameMockupTemplate: TemplateManifest = {
	id: 'StitchFairyCo-frameMockup',
	name: 'Frame mockup',
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'patternRender',
		},
		{
			type: TemplatePropType.Color,
			name: 'color',
		},
	],
	dimensions: {
		width: 870,
		height: 871,
	},
	layers: [
		{
			id: 'color',
			name: 'Color',
			type: LayerType.ColorProp,
			propName: 'color',
		},
		{
			id: 'multiply',
			name: 'Multiply',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/01_multiply.png',
			mode: 'multiply',
		},
		{
			id: 'soft-light',
			name: 'Soft light',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/02_soft-light.png',
			mode: 'soft-light',
		},
		{
			id: 'overlay',
			name: 'Overlay',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/03_overlay.png',
			mode: 'overlay',
		},
		{
			id: 'pattern',
			name: 'Pattern',
			type: LayerType.TextureProp,
			propName: 'patternRender',
			x: 94,
			y: 97,
			width: 681,
			height: 680,
		},
		{
			id: 'multiply',
			name: 'Multiply',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/04_multiply.png',
			mode: 'multiply',
		},
	],
};

export const flossMockupTemplate: TemplateManifest = {
	id: 'StitchFairyCo-flossMockup',
	name: 'Floss mockup',
	props: [
		{
			type: TemplatePropType.Color,
			name: 'color1',
		},
		{
			type: TemplatePropType.Color,
			name: 'color2',
		},
		{
			type: TemplatePropType.Color,
			name: 'color3',
		},
		{
			type: TemplatePropType.Color,
			name: 'color4',
		},
		{
			type: TemplatePropType.Color,
			name: 'color5',
		},
	],
	dimensions: {
		width: 514,
		height: 491,
	},
	layers: [
		{
			id: 'color1',
			name: 'Color 1',
			type: LayerType.ColorProp,
			propName: 'color1',
			mask: {
				id: 'color1Mask',
				name: 'Color 1 mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/01_color.png',
			},
		},
		{
			id: 'color2',
			name: 'Color 2',
			type: LayerType.ColorProp,
			propName: 'color2',
			mask: {
				id: 'color2Mask',
				name: 'Color 2 mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/02_color.png',
			},
		},
		{
			id: 'color3',
			name: 'Color 3',
			type: LayerType.ColorProp,
			propName: 'color3',
			mask: {
				id: 'color3Mask',
				name: 'Color 3 mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/03_color.png',
			},
		},
		{
			id: 'color4',
			name: 'Color 4',
			type: LayerType.ColorProp,
			propName: 'color4',
			mask: {
				id: 'color4Mask',
				name: 'Color 4 mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/04_color.png',
			},
		},
		{
			id: 'color5',
			name: 'Color 5',
			type: LayerType.ColorProp,
			propName: 'color5',
			mask: {
				id: 'color5Mask',
				name: 'Color 5 mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/05_color.png',
			},
		},
		{
			id: 'effect-1',
			name: 'Effect 1',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/06_normal.png',
		},
		{
			id: 'effect-2',
			name: 'Effect 2',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/07_multiply.png',
			mode: 'multiply',
		},
		{
			id: 'effect-3',
			name: 'Effect 3',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/08_soft-light.png',
			mode: 'soft-light',
		},
		{
			id: 'effect-4',
			name: 'Effect 4',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/09_overlay.png',
			mode: 'overlay',
		},
		{
			id: 'effect-5',
			name: 'Effect 5',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/10_normal.png',
		},
	],
};

export const fabricMockupTemplate: TemplateManifest = {
	id: 'StitchFairyCo-fabricMockup',
	name: 'Fabric mockup',
	props: [
		{
			type: TemplatePropType.Color,
			name: 'color',
		},
	],
	dimensions: {
		width: 454,
		height: 454,
	},
	layers: [
		{
			id: 'color',
			name: 'Color',
			type: LayerType.ColorProp,
			propName: 'color',
			mask: {
				id: 'colorMask',
				name: 'Color mask',
				type: LayerType.StaticTexture,
				textureUrl: '/assets/fabric_mockup/01_color.png',
			},
		},
		{
			id: 'effect-1',
			name: 'Effect 1',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/02_multiply.png',
			mode: 'multiply',
		},
		{
			id: 'effect-2',
			name: 'Effect 2',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/03_soft-light.png',
			mode: 'soft-light',
		},
		{
			id: 'effect-3',
			name: 'Effect 3',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/04_overlay.png',
			mode: 'overlay',
		},
	],
};

export const wideCoverTemplate: TemplateManifest = {
	id: 'StitchFairyCo-wideCover',
	name: 'Wide cover',
	props: [],
	dimensions: {
		width: 1500,
		height: 1000,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/01_background.png',
		},
		{
			id: 'flossMockup',
			name: 'Floss mockup',
			type: LayerType.SmartObject,
			template: flossMockupTemplate,
			x: -96,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			id: 'fabricMockup',
			name: 'Fabric mockup',
			type: LayerType.SmartObject,
			template: fabricMockupTemplate,
			x: 1046,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			id: 'layer',
			name: 'Layer',
			type: LayerType.SmartObject,
			template: hoopMockupTemplate,
			x: 312,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			id: 'pdf',
			name: 'PDF',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/02_pdf.png',
		},
		{
			id: 'lighting',
			name: 'Lighting',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/03_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const etsyCoverTemplate: TemplateManifest = {
	id: 'StitchFairyCo-etsyCover',
	name: 'Etsy cover',
	props: [],
	dimensions: {
		width: 1259,
		height: 1000,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/01_background.png',
		},
		{
			id: 'flossMockup',
			name: 'Floss mockup',
			type: LayerType.SmartObject,
			template: flossMockupTemplate,
			x: -216,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			id: 'fabricMockup',
			name: 'Fabric mockup',
			type: LayerType.SmartObject,
			template: fabricMockupTemplate,
			x: 805,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			id: 'layer',
			name: 'Layer',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/02_layer.png',
		},
		{
			id: 'hoopMockup',
			name: 'Hoop mockup',
			type: LayerType.SmartObject,
			template: hoopMockupTemplate,
			x: 192,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			id: 'pdf',
			name: 'PDF',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/03_pdf.png',
		},
		{
			id: 'lighting',
			name: 'Lighting',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/04_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const squareCoverTemplate: TemplateManifest = {
	id: 'StitchFairyCo-squareCover',
	name: 'Square cover',
	props: [],
	dimensions: {
		width: 1000,
		height: 1000,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/01_background.png',
		},
		{
			id: 'fabricMockup',
			name: 'Fabric mockup',
			type: LayerType.SmartObject,
			template: fabricMockupTemplate,
			x: 546,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			id: 'flossMockup',
			name: 'Floss mockup',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/02_shadow.png',
		},
		{
			id: 'hoopMockup',
			name: 'Hoop mockup',
			type: LayerType.SmartObject,
			template: hoopMockupTemplate,
			x: 62,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			id: 'pdf',
			name: 'PDF',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/03_pdf.png',
		},
		{
			id: 'flossMockup',
			name: 'Floss mockup',
			type: LayerType.SmartObject,
			template: flossMockupTemplate,
			x: -211,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			id: 'lighting',
			name: 'Lighting',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/04_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const frameCoverTemplate: TemplateManifest = {
	id: 'StitchFairyCo-frameCover',
	name: 'Frame cover',
	props: [
		{
			type: TemplatePropType.Color,
			name: 'backgroundColor',
		},
	],
	dimensions: {
		width: 1500,
		height: 1000,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.ColorProp,
			propName: 'backgroundColor',
		},
		{
			id: 'shadow',
			name: 'Shadow',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_frame/03_shadow.png',
		},
		{
			id: 'frameMockup',
			name: 'Frame mockup',
			type: LayerType.SmartObject,
			template: frameMockupTemplate,
			x: 315,
			y: 65,
			width: 870,
			height: 871,
		},
		{
			id: 'lighting',
			name: 'Lighting',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_frame/00_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const infoCoverTemplate: TemplateManifest = {
	id: 'StitchFairyCo-infoCover',
	name: 'Info cover',
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'page1',
		},
		{
			type: TemplatePropType.Texture,
			name: 'page2',
		},
	],
	dimensions: {
		width: 1500,
		height: 1000,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: `assets/cover_info/1-background.png`,
		},
		{
			id: 'page2',
			name: 'Page 2',
			type: LayerType.TextureProp,
			propName: 'page2',
			x: -88,
			y: 81,
			width: 858,
			height: 1083,
			rotation: 11,
		},
		{
			id: 'effect',
			name: 'Effect',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_info/2-page.png',
		},
		{
			id: 'page1',
			name: 'Page 1',
			type: LayerType.TextureProp,
			propName: 'page1',
			x: -72,
			y: 273,
			width: 963,
			height: 1140,
			rotation: 19,
		},
		{
			id: 'hoopMockup',
			name: 'Hoop mockup',
			type: LayerType.SmartObject,
			template: hoopMockupTemplate,
			x: 842,
			y: 513,
			width: 877,
			height: 941,
		},
	],
};

export const pinterest1Template: TemplateManifest = {
	id: 'StitchFairyCo-pinterest1',
	name: 'Pinterest 1',
	props: [
		{
			type: TemplatePropType.Color,
			name: 'barColor',
		},
	],
	dimensions: {
		width: 1000,
		height: 1500,
	},
	layers: [
		{
			id: 'background',
			name: 'Background',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/1-background.png',
		},
		{
			id: 'fabricMockup',
			name: 'Fabric mockup',
			type: LayerType.SmartObject,
			template: fabricMockupTemplate,
			x: 546,
			y: 956,
			width: 454,
			height: 454,
		},
		{
			id: 'flossMockup',
			name: 'Floss mockup',
			type: LayerType.SmartObject,
			template: flossMockupTemplate,
			x: -132,
			y: 1082,
			width: 477,
			height: 532,
			rotation: -25.25,
		},
		{
			id: 'shadow',
			name: 'Shadow',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/2-loop-shadow.png',
		},
		{
			id: 'hoopMockup',
			name: 'Hoop mockup',
			type: LayerType.SmartObject,
			template: hoopMockupTemplate,
			x: 61,
			y: 261,
			width: 877,
			height: 941,
		},
		{
			id: 'stamp',
			name: 'Stamp',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/3-stamp.png',
		},
		{
			id: 'lighting',
			name: 'Lighting',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/4-light.png',
			mode: 'soft-light',
		},
		{
			id: 'bar',
			name: 'Bar',

			type: LayerType.ColorProp,
			propName: 'barColor',
			mask: {
				id: 'barMask',
				name: 'Bar mask',

				type: LayerType.StaticTexture,
				textureUrl: '/assets/pinterest1/5-bar-mask.png',
			},
		},
		{
			id: 'bar-text',
			name: 'Bar text',
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/6-bar-text.png',
		},
	],
};
