import { ClientProviders } from './providers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return <ClientProviders>{children}</ClientProviders>;
}
