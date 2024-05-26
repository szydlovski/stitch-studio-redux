import { LayerType } from './layer';
import { defineTemplate } from './new';
import { TemplatePropType, defineEmbedProp } from './props';
import { TemplateManifest } from './types';

export const loopMockupTemplate = defineTemplate({
	props: {
		patternRender: { type: TemplatePropType.Texture },
	},
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
});

export const flossMockupTemplate = defineTemplate({
	props: {
		color1: { type: TemplatePropType.Color },
		color2: { type: TemplatePropType.Color },
		color3: { type: TemplatePropType.Color },
		color4: { type: TemplatePropType.Color },
		color5: { type: TemplatePropType.Color },
	},
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
});

export const fabricMockupTemplate = defineTemplate({
	props: {
		color: {
			type: TemplatePropType.Color,
		},
	},
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
});

export const etsyCoverTemplate = defineTemplate({
	props: {
		loop: defineEmbedProp(loopMockupTemplate),
		floss: defineEmbedProp(flossMockupTemplate),
		fabric: defineEmbedProp(fabricMockupTemplate),
	},
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
});
