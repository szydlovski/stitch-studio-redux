import { auth } from '@/app/auth';
import { LoginView } from '@presentation/views';
import { redirect } from 'next/navigation';
import { AppViews } from '../routes';

export default async function LoginPage() {
	const session = await auth();
	if (session?.user) redirect(AppViews.Dashboard());
	return <LoginView />;
}
