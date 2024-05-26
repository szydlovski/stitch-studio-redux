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
