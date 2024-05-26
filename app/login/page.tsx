import { LoginScreen } from '@/components/auth/LoginScreen';
import { auth } from '@/config/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
	const session = await auth();
	if (session?.user) redirect('/app/dashboard');
	return <LoginScreen />;
}
