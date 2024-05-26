import { Drawable } from '../canvas';
import { TemplateLayer } from './layer';
import { TemplatePropType, TemplateProp } from './props';

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
