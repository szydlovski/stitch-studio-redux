'use client';

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
} from '@/components/ui';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';

export const ProfileCard = () => {
	const session = useSession();
	const identity = session.data?.identity;
	return (
		identity && (
			<Card>
				<CardHeader>
					<CardTitle>Your Profile</CardTitle>
					<CardDescription>
						Basic information about your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label>Name</Label>
							<Input value={identity.name} readOnly />
						</div>
						<div className="grid gap-2">
							<Label>Email</Label>
							<Input value={identity.email} readOnly />
						</div>
					</div>
				</CardContent>
				<CardFooter className="border-t px-6 py-4">
					<Button disabled>Save</Button>
				</CardFooter>
			</Card>
		)
	);
};
