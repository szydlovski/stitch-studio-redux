import { auth } from '@/app/auth';
import { LoginView } from '@presentation/views';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const session = await auth();
	if (session?.user) redirect('/studio/dashboard');
	return <LoginView />;
}
