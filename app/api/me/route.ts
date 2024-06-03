import { getUserByEmail } from '@/actions/getUserByEmail';
import { auth } from '@/config/auth';
import { getXataClient } from '@/lib/xata';

const createErrorResponse = (message: string, status = 400) => {
	return Response.json({ error: true, message }, { status });
};

export async function GET() {
	const session = await auth();
	
	if (!session?.user?.email) {
		return createErrorResponse('No active session', 401);
	}
	const user = await getUserByEmail(session.user.email);
	if (!user) {
		return createErrorResponse('User not found', 401);
	}
	return Response.json({ identity: user.toSerializable() });
}