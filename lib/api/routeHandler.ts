import { auth as getSession } from '@/app/auth';
import { XataClient, getXataClient } from '@/lib/xata';
import { Session } from 'next-auth';
import { NextResponse } from 'next/server';

interface RouteOptions {
	auth?: boolean;
}

interface RequestContext<Params> {
	req: Request;
	params: Params;
	xata: XataClient;
	session: Session;
}

export const routeHandler = <Params, T = any>(
	handler: (ctx: RequestContext<Params>) => T,
	options?: RouteOptions
) => {
	const xata = getXataClient();
	return async function handleRoute(
		req: Request,
		{ params, ...others }: { params: Params }
	) {
		const session = await getSession();

		if (options?.auth && !session) {
			return NextResponse.json(
				{ error: true, message: 'Unauthorized' },
				{ status: 401 }
			);
		}
		return handler({ req, params, xata, session: session! }) as void | Response;
	};
};
