import { auth } from '@/app/auth';
import { GetUserByEmailQuery } from '@infrastructure/user';
import { NextResponse } from 'next/server';

const createErrorResponse = (message: string, status = 400) => {
	return NextResponse.json({ error: true, message }, { status });
};

export async function GET() {
	const session = await auth();

	if (!session?.user?.email) {
		return createErrorResponse('No active session', 401);
	}
	const user = await new GetUserByEmailQuery().execute(session.user.email);
	if (!user) {
		return createErrorResponse('User not found', 401);
	}
	return NextResponse.json({ identity: user });
}
