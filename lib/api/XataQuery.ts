import { XataClient, getXataClient } from '@/lib/xata';

export abstract class XataQuery<T = any, Args extends any[] = any[]> {
	public constructor(protected readonly xata: XataClient = getXataClient()) {}
	public abstract execute(...args: Args): Promise<T>;
}
