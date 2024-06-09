import { LoginScreen } from '@/presentation/components/auth/LoginScreen';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const session = await auth();
	if (session?.user) redirect('/studio/dashboard');
	return <LoginScreen />;
}
