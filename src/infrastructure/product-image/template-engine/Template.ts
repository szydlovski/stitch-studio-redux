import {
	Dimensions,
	LayerType,
	TemplateLayer,
	TemplateManifest,
	TemplatePropDefinition,
} from './types';

export class Template implements TemplateManifest {
	constructor(private readonly manifest: TemplateManifest) {}
	public get id(): string {
		return this.manifest.id;
	}
	public get name(): string {
		return this.manifest.name;
	}
	public get layers(): TemplateLayer[] {
		return this.manifest.layers;
	}
	public get dimensions(): Dimensions {
		return this.manifest.dimensions;
	}
	public get props(): TemplatePropDefinition[] {
		return this.manifest.props;
	}
	public get textureUrls(): string[] {
		return this.manifest.layers.flatMap((layer) => {
			const urls = [];
			if (layer.type === LayerType.StaticTexture) urls.push(layer.textureUrl);
			if (layer.type === LayerType.SmartObject)
				urls.push(...new Template(layer.template).textureUrls);
			if (layer.mask && layer.mask?.type === LayerType.StaticTexture)
				urls.push(layer.mask.textureUrl);
			return urls;
		});
	}
}
