import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginForm = () => {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-4">
				<Button className="w-full">
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

const SignUpForm = () => {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Sign up</h1>
				<p className="text-balance text-muted-foreground">
					Enter your information to create an account
				</p>
			</div>
			<div className="grid gap-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="grid gap-2">
						<Label htmlFor="first-name">First name</Label>
						<Input id="first-name" placeholder="Max" required />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="last-name">Last name</Label>
						<Input id="last-name" placeholder="Robinson" required />
					</div>
				</div>
				<Button type="submit" className="w-full">
					Sign up with Google
				</Button>
			</div>
			<div className="mt-4 text-center text-sm">
				Already have an account?{' '}
				<Link href="#" className="underline">
					Sign in
				</Link>
			</div>
		</div>
	);
};

export function LoginScreen() {
	return (
		<div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<LoginForm />
				{/* <SignUpForm /> */}
			</div>
			<div className="hidden bg-muted lg:block">
				<Image
					src="/login-bg.png"
					alt="Image"
					width="1920"
					height="1080"
					className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>
			</div>
		</div>
	);
}
