import {
	LayerType,
	TemplateManifest,
	TemplatePropType,
} from '@/infrastructure/product-image/types';

const etsyCoverKeys = [
	'etsy_cover',
	'etsy_image'
]

export const loopMockupTemplate: TemplateManifest = {
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
			type: LayerType.TextureProp,
			propName: 'patternRender',
			x: 26,
			y: 107,
			width: 1050,
			height: 1050,
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/loop_mockup/loop_mask.png',
			},
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/loop_mockup/loop_texture.png',
		},
	],
};

export const frameMockupTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'pattern',
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
			type: LayerType.ColorProp,
			propName: 'color',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/01_multiply.png',
			mode: 'multiply',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/02_soft-light.png',
			mode: 'soft-light',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/03_overlay.png',
			mode: 'overlay',
		},
		{
			type: LayerType.TextureProp,
			propName: 'pattern',
			x: 94,
			y: 97,
			width: 681,
			height: 680,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/mockup_frame/04_multiply.png',
			mode: 'multiply',
		},
	],
};

export const flossMockupTemplate: TemplateManifest = {
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
			type: LayerType.ColorProp,
			propName: 'color1',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/01_color.png',
			},
		},
		{
			type: LayerType.ColorProp,
			propName: 'color2',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/02_color.png',
			},
		},
		{
			type: LayerType.ColorProp,
			propName: 'color3',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/03_color.png',
			},
		},
		{
			type: LayerType.ColorProp,
			propName: 'color4',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/04_color.png',
			},
		},
		{
			type: LayerType.ColorProp,
			propName: 'color5',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/floss_mockup/05_color.png',
			},
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/06_normal.png',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/07_multiply.png',
			mode: 'multiply',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/08_soft-light.png',
			mode: 'soft-light',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/09_overlay.png',
			mode: 'overlay',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/floss_mockup/10_normal.png',
		},
	],
};

export const fabricMockupTemplate: TemplateManifest = {
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
			type: LayerType.ColorProp,
			propName: 'color',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/fabric_mockup/01_color.png',
			},
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/02_multiply.png',
			mode: 'multiply',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/03_soft-light.png',
			mode: 'soft-light',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/fabric_mockup/04_overlay.png',
			mode: 'overlay',
		},
	],
};

export const wideCoverTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'loopMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'flossMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'fabricMockup',
		},
	],
	dimensions: {
		width: 1500,
		height: 1000,
	},
	layers: [
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/01_background.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'flossMockup',
			x: -96,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			type: LayerType.TextureProp,
			propName: 'fabricMockup',
			x: 1046,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			type: LayerType.TextureProp,
			propName: 'loopMockup',
			x: 312,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/02_pdf.png',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_wide/03_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const etsyCoverTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'loopMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'flossMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'fabricMockup',
		},
	],
	dimensions: {
		width: 1259,
		height: 1000,
	},
	layers: [
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/01_background.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'flossMockup',
			x: -216,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			type: LayerType.TextureProp,
			propName: 'fabricMockup',
			x: 805,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/02_layer.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'loopMockup',
			x: 192,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/03_pdf.png',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_etsy/04_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const squareCoverTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'loopMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'flossMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'fabricMockup',
		},
	],
	dimensions: {
		width: 1000,
		height: 1000,
	},
	layers: [
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/01_background.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'fabricMockup',
			x: 546,
			y: 546,
			width: 454,
			height: 454,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/02_shadow.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'loopMockup',
			x: 62,
			y: 30,
			width: 877,
			height: 941,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/03_pdf.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'flossMockup',
			x: -211,
			y: 638,
			width: 514,
			height: 491,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_square/04_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const frameCoverTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'frameMockup',
		},
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
			type: LayerType.ColorProp,
			propName: 'backgroundColor',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_frame/03_shadow.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'frameMockup',
			x: 315,
			y: 65,
			width: 870,
			height: 871,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_frame/00_lighting.png',
			mode: 'soft-light',
		},
	],
};

export const infoCoverTemplate: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'page1',
		},
		{
			type: TemplatePropType.Texture,
			name: 'page2',
		},
		{
			type: TemplatePropType.Texture,
			name: 'loopMockup',
		},
	],
	dimensions: {
		width: 1500,
		height: 1000,
	},
	layers: [
		{
			type: LayerType.StaticTexture,
			textureUrl: `assets/cover_info/1-background.png`,
		},
		{
			type: LayerType.TextureProp,
			propName: 'page2',
			x: -88,
			y: 81,
			width: 858,
			height: 1083,
			rotation: 11,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/cover_info/2-page.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'page1',
			x: -72,
			y: 273,
			width: 963,
			height: 1140,
			rotation: 19,
		},
		{
			type: LayerType.TextureProp,
			propName: 'loopMockup',
			x: 842,
			y: 513,
			width: 877,
			height: 941,
		},
	],
};

export const pinterest1Template: TemplateManifest = {
	props: [
		{
			type: TemplatePropType.Texture,
			name: 'loopMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'flossMockup',
		},
		{
			type: TemplatePropType.Texture,
			name: 'fabricMockup',
		},
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
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/1-background.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'fabricMockup',
			x: 546,
			y: 956,
			width: 454,
			height: 454,
		},
		{
			type: LayerType.TextureProp,
			propName: 'flossMockup',
			x: -132,
			y: 1082,
			width: 477,
			height: 532,
			rotation: -25.25,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/2-loop-shadow.png',
		},
		{
			type: LayerType.TextureProp,
			propName: 'loopMockup',
			x: 61,
			y: 261,
			width: 877,
			height: 941,
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/3-stamp.png',
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/4-light.png',
			mode: 'soft-light',
		},
		{
			type: LayerType.ColorProp,
			propName: 'barColor',
			mask: {
				type: LayerType.StaticTexture,
				textureUrl: '/assets/pinterest1/5-bar-mask.png',
			},
		},
		{
			type: LayerType.StaticTexture,
			textureUrl: '/assets/pinterest1/6-bar-text.png',
		},
	],
};
