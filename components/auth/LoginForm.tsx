'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

export const LoginForm = () => {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-4">
				<Button className="w-full" onClick={() => signIn('google')}>
					Login with Google
				</Button>
			</div>
			<div className="mt-4 text-center text-sm">
				Don&apos;t have an account?{' '}
				<Link href="#" className="underline">
					Sign up
				</Link>
			</div>
		</div>
	);
};
