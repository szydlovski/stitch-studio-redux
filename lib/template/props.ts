import { Drawable } from '../canvas';
import { TemplateDef } from './new';

export enum TemplatePropType {
	Texture = 'texture',
	Color = 'color',
	Embed = 'embed',
}

export type TemplatePropValue<T extends TemplateProp> = {
	[TemplatePropType.Color]: string;
	[TemplatePropType.Texture]: string;
	[TemplatePropType.Embed]: T extends EmbedTemplateProp<infer P> ? P : never;
}[T['type']];

interface BaseTemplateProp {
	type: TemplatePropType;
}

export interface TextureTemplateProp extends BaseTemplateProp {
	type: TemplatePropType.Texture;
}

export interface ColorTemplateProp extends BaseTemplateProp {
	type: TemplatePropType.Color;
}

export interface EmbedTemplateProp<T extends TemplateDef = TemplateDef>
	extends BaseTemplateProp {
	type: TemplatePropType.Embed;
	template: T;
}

export const defineEmbedProp = <T extends TemplateDef = TemplateDef>(
	template: T
): EmbedTemplateProp<T> => ({
	type: TemplatePropType.Embed,
	template,
});

export type TemplateProp =
	| TextureTemplateProp
	| ColorTemplateProp
	| EmbedTemplateProp;

export type DefaultTemplateProps = Record<string, TemplateProp>;
