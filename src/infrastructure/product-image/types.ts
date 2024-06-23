import { Drawable } from '@lib/canvas';

// core

export type TextureDictionary = Record<string, HTMLImageElement>;

export type TemplateProps = Record<string, string | Drawable>;
export interface TemplateManifest {
	props: {
		type: TemplatePropType;
		name: string;
	}[];
	dimensions: {
		width: number;
		height: number;
	};
	layers: TemplateLayer[];
}

// layers

export enum LayerType {
	StaticTexture = 'static_texture',
	TextureProp = 'texture_prop',
	StaticColor = 'static_color',
	ColorProp = 'color_prop',
}

interface BaseLayer {
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	mask?: TemplateLayer;
	mode?: GlobalCompositeOperation;
	rotation?: number;
}

export interface StaticTextureLayer extends BaseLayer {
	type: LayerType.StaticTexture;
	textureUrl: string;
}

export interface TexturePropLayer extends BaseLayer {
	type: LayerType.TextureProp;
	propName: string;
}

export interface ColorPropLayer extends BaseLayer {
	type: LayerType.ColorProp;
	propName: string;
}

export type TemplateLayer =
	| StaticTextureLayer
	| TexturePropLayer
	| ColorPropLayer;

// props

export enum TemplatePropType {
	Texture = 'texture',
	Color = 'color',
	Embed = 'embed',
}

interface BaseTemplateProp {
	type: TemplatePropType;
}

export interface TextureTemplateProp extends BaseTemplateProp {
	type: TemplatePropType.Texture;
}

export interface ColorTemplateProp extends BaseTemplateProp {
	type: TemplatePropType.Color;
}

export type TemplateProp = TextureTemplateProp | ColorTemplateProp;
