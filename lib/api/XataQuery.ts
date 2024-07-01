import { XataClient, getXataClient } from '@lib/xata';
import { XataFile } from '@xata.io/client';
import { StaticImageData } from 'next/image';

export abstract class XataQuery<T = any, Args extends any[] = any[]> {
	public constructor(protected readonly xata: XataClient = new XataClient()) {}
	public abstract execute(...args: Args): Promise<T>;
	public static fileToStaticImage(file: XataFile): StaticImageData {
		const { signedUrl, attributes } = file;
		const { width, height } = attributes ?? {};
		if (!signedUrl) throw new Error('File has no signed URL');
		if (!width || !height) throw new Error('File has no dimensions');
		return {
			width,
			height,
			src: signedUrl,
		};
	}
}
