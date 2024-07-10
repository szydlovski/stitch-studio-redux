const RENDER_ERROR_SYMBOL = Symbol('RenderError');

export enum RenderErrorType {
	Undefined = 'Undefined',
	TextureNotFound = 'TextureNotFound',
	TemplatePropNotFound = 'TemplatePropNotFound',
}

export class RenderError extends Error {
	[RENDER_ERROR_SYMBOL] = true;
	public readonly name = 'RenderError';
	public constructor(
		public readonly message: string,
		public readonly type: RenderErrorType = RenderErrorType.Undefined,
		public readonly meta?: Record<string, any>
	) {
		super(message);
	}
	public static isRenderError(error: any): error is RenderError {
		return error?.[RENDER_ERROR_SYMBOL] === true;
	}
}

export class RenderErrorBuilder {
	public static TextureNotFound(url: string): RenderError {
		return new RenderError(
			`Texture ${url} not found. Make sure to preload template textures before rendering.`,
			RenderErrorType.TextureNotFound,
			{ url }
		);
	}
	public static TextureFailedToLoad(url: string): RenderError {
		return new RenderError(
			`Failed to load texture ${url}.`,
			RenderErrorType.TextureNotFound,
			{ url }
		);
	}
	public static TemplatePropNotFound(name: string): RenderError {
		return new RenderError(
			`Template prop ${name} not found.`,
			RenderErrorType.TemplatePropNotFound,
			{ name }
		);
	}
}
