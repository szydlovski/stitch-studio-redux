import { XataClient } from './xata';

export abstract class XataQuery<T, Args extends any[] = any[]> {
	public constructor(protected readonly xata: XataClient) {}
	public abstract execute(...args: Args): Promise<T>;
}
