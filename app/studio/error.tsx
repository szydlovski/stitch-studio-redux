'use client'; // Error components must be Client Components

import { ErrorAlert } from '@components/ErrorAlert';
import { Button, View } from '@components/ui';
import { DashboardLayout } from '@presentation/layout';
import { CircleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<DashboardLayout>
			<View className="p-6 bg-muted flex-row justify-center items-center">
				<div className="max-w-xl flex-1">
					<div>
						<CircleAlertIcon
							strokeWidth={1}
							className="text-destructive h-12 w-12"
						/>
						<h1 className="text-destructive font-semibold text-lg">
							Something went wrong...
						</h1>
						<Button onClick={reset} variant="ghost" className="mt-4">
							Reset
						</Button>
					</div>
				</div>
			</View>
		</DashboardLayout>
	);
}
