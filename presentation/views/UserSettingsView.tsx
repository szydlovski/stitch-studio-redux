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
} from '@/presentation/components/ui';
import { cn } from '@/lib';
import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { ProfileCard } from '@/presentation/components/UserCards/ProfileCard';

enum UserPreferencesTab {
	Profile = 'profile',
	General = 'general',
	Security = 'security',
}

interface UserPreferencesTabConfig {
	label: string;
	key: UserPreferencesTab;
	content: FC;
}

const USER_PREFERENCES_TABS: Record<
	UserPreferencesTab,
	UserPreferencesTabConfig
> = {
	[UserPreferencesTab.Profile]: {
		label: 'Profile',
		key: UserPreferencesTab.Profile,
		content: ProfileCard,
	},
	[UserPreferencesTab.General]: {
		label: 'General',
		key: UserPreferencesTab.General,
		content: () => (
			<Card>
				<CardHeader>
					<CardTitle>General</CardTitle>
				</CardHeader>
				<CardFooter className="border-t px-6 py-4">
					<Button disabled>Save</Button>
				</CardFooter>
			</Card>
		),
	},
	[UserPreferencesTab.Security]: {
		label: 'Security',
		key: UserPreferencesTab.Security,
		content: () => (
			<Card>
				<CardHeader>
					<CardTitle>Security</CardTitle>
				</CardHeader>
				<CardFooter className="border-t px-6 py-4">
					<Button disabled>Save</Button>
				</CardFooter>
			</Card>
		),
	},
};

export const UserSettingsView = () => {
	const [activeTab, setActiveTab] = useState<UserPreferencesTab>(
		UserPreferencesTab.Profile
	);
	const TabContent = USER_PREFERENCES_TABS[activeTab].content;
	return (
		<div className="flex flex-1 flex-col gap-4 bg-muted/40 min-h-full p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<nav className="grid gap-4 text-sm text-muted-foreground">
					{Object.values(USER_PREFERENCES_TABS).map(({ label, key }) => (
						<Link
							key={key}
							href="#"
							onClick={() => setActiveTab(key)}
							className={cn(key === activeTab && 'font-semibold text-primary')}
						>
							{label}
						</Link>
					))}
				</nav>
				<div className="grid gap-6">
					<TabContent />
				</div>
			</div>
		</div>
	);
};
