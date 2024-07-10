import { Drawable } from '@lib/canvas';

// core

export interface Dimensions {
	width: number;
	height: number;
}

export type TextureDictionary = Record<string, Drawable>;

export interface TemplatePropDefinition {
	type: TemplatePropType;
	name: string;
}

export type TemplateProps = Record<string, string | Drawable>;
export interface TemplateManifest {
	id: string;
	name: string;
	dimensions: Dimensions;
	layers: TemplateLayer[];
	props: TemplatePropDefinition[];
}

// layers

export enum LayerType {
	StaticTexture = 'static_texture',
	TextureProp = 'texture_prop',
	StaticColor = 'static_color',
	ColorProp = 'color_prop',
	SmartObject = 'smart_object',
}

interface BaseLayer {
	id: string;
	name: string;
	x?: number;
	y?: number;
	width?: number;
	height?: number;
	mask?: TemplateLayer;
	mode?: GlobalCompositeOperation;
	opactity?: number;
	rotation?: number;
}

export interface StaticTextureLayer extends BaseLayer {
	type: LayerType.StaticTexture;
	textureUrl: string;
}

export interface SmartObjectLayer extends BaseLayer {
	type: LayerType.SmartObject;
	template: TemplateManifest;
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
	| ColorPropLayer
	| SmartObjectLayer;

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
