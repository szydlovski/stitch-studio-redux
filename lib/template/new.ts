import { TemplateLayer } from './layer';
import { EmbedTemplateProp, TemplateProp, TemplatePropType } from './props';

export interface Dimensions {
	width: number;
	height: number;
}

export interface TemplateArgs<
	Props extends Record<string, TemplateProp> = Record<string, TemplateProp>
> {
	name?: string;
	props: Props;
	layers: TemplateLayer[];
	dimensions: Dimensions;
}

export interface TemplateDef<
	Props extends Record<string, TemplateProp> = Record<string, TemplateProp>
> {
	props: {
		[K in keyof Props]: Props[K] extends EmbedTemplateProp
			? Props[K]['template']['props']
			: Props[K];
	};
	layers: TemplateLayer[];
	dimensions: {
		width: number;
		height: number;
	};
}

export const defineTemplate = <Props extends Record<string, TemplateProp>>(
	template: TemplateArgs<Props>
) => template;

const template1 = defineTemplate({
	props: { dupa: { type: TemplatePropType.Texture } },
	dimensions: { width: 20, height: 20 },
	layers: [],
});

const template2 = defineTemplate({
	props: { dupa: { type: TemplatePropType.Texture } },
	dimensions: { width: 20, height: 20 },
	layers: [],
});
