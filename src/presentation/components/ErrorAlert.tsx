'use client';
import { Alert, AlertDescription, AlertTitle } from '@components/ui';
import { CircleAlertIcon } from 'lucide-react';

export const ErrorAlert = ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => (
	<Alert variant={'destructive'}>
		<CircleAlertIcon className="h-4 w-4" />
		<AlertTitle>{title}</AlertTitle>
		<AlertDescription>{description}</AlertDescription>
	</Alert>
);
