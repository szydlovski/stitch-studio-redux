import { SinglePageLayout } from '@/presentation/layout';
import { UserSettingsView } from '@/presentation/views';

export default function UserPage() {
	return (
		<SinglePageLayout header={'User Settings'}>
			<UserSettingsView />
		</SinglePageLayout>
	);
}
