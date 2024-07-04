'use client';
import { BrushIcon, SearchIcon } from 'lucide-react';
import {
	Button,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Dialog,
	Input,
	ScrollArea,
} from '@components/ui';
import { useRouter } from 'next/navigation';

import { MENU_LINKS } from '@presentation/layout/links';
import {
	CreateProductDialogContent,
	FilePatternPayload,
} from '@presentation/views/ProductsView/components/CreateProductDialog';
import debounce from 'lodash.debounce';
import Link from 'next/link';
import React from 'react';
import { useSearchContext } from '@presentation/features/search/SearchContext';

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// Awaited<ReturnType<typeof globalSearch>>['results']
type SearchResult = ArrayElement<any>;

export function CommandToolbarItem() {
	const { items: customItems } = useSearchContext();
	const [searchTerm, setSearchTerm] = React.useState('');
	const [searchResults, setSearchResults] = React.useState<SearchResult[]>();
	const [searching, setSearching] = React.useState(false);
	const [state, setState] = React.useState<FilePatternPayload>();
	const [success, setSuccess] = React.useState(false);
	const router = useRouter();
	const [open, setOpen] = React.useState(false);
	const [dialogOpen, setDialogOpen] = React.useState(false);

	const handleDebounceFn = async (value: string) => {
		setSearching(true);
		// const { total, results } = await globalSearch(value);
		// setSearchResults(results);
		setSearching(false);
	};

	const debounced = debounce(handleDebounceFn, 500);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<DashboardCommandTrigger onOpen={() => setOpen(true)} />
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					value={searchTerm}
					className="ml-auto"
					placeholder="Type a command or search..."
					onChangeCapture={async (evt) => {
						const searchTerm = evt.currentTarget.value;
						setSearchTerm(searchTerm);
						if (searchTerm.length >= 3) debounced(searchTerm);
					}}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{customItems.length > 0 && (
						<CommandGroup heading="Custom">
							{customItems.map(({ id, label, onClick, href, icon: Icon }) => {
								const content = (
									<>
										{Icon && <Icon size={10} />}
										{label}
									</>
								);
								return (
									<CommandItem
										key={id}
										value={label}
										onSelect={() => {
											onClick?.();
											setOpen(false);
										}}
										asChild={!!href}
									>
										{href ? <Link href={href}>{content}</Link> : content}
									</CommandItem>
								);
							})}
						</CommandGroup>
					)}
					<CommandSearchResults
						searchTerm={searchTerm}
						searchResults={searchResults ?? []}
						searching={searching}
					/>
					<NavigationCommands />
					<CommandGroup heading="Workflows">
						<CommandItem
							className="flex gap-2"
							value={'createProduct'}
							onSelect={() => {
								setDialogOpen(true);
								setOpen(false);
							}}
						>
							<BrushIcon className="h-[10px] w-[10px] opacity-75" />
							{'Create product'}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
			<Dialog open={dialogOpen} onOpenChange={(value) => setDialogOpen(value)}>
				<CreateProductDialogContent
					state={state}
					setState={setState}
					success={success}
					onSuccess={() => setSuccess(true)}
				/>
			</Dialog>
		</>
	);
}

export function CommandSearchResults({
	searchTerm,
	searchResults,
}: {
	searchTerm: string;
	searchResults: SearchResult[];
	searching: boolean;
}) {
	const show = searchTerm.length >= 3 && searchResults.length > 0;
	if (!show) return null;
	return (
		<CommandGroup heading="Search">
			{/* {searchResults.map(({ table, record }) => {
				return (
					<CommandItem asChild key={record.id} value={record.title}>
						<Link className="flex gap-2" href={`/studio/products/${record.id}`}>
							<div className="h-[20px] w-[20px] flex">
								<Image
									src={record.thumbnail!.signedUrl!}
									width={record.thumbnail!.attributes!.width!}
									height={record.thumbnail!.attributes!.height!}
									alt={record.title!}
								/>
							</div>
							{record.title}
						</Link>
					</CommandItem>
				);
			})} */}
		</CommandGroup>
	);
}

export function NavigationCommands() {
	return (
		<CommandGroup heading="Navigation">
			{MENU_LINKS.map(({ href, label, icon: Icon }) => (
				<CommandItem asChild key={label} value={label}>
					<Link href={href} className="flex gap-2">
						<Icon className="opacity-75" />
						{label}
					</Link>
				</CommandItem>
			))}
		</CommandGroup>
	);
}

export const DashboardCommandTrigger = ({ onOpen }: { onOpen: () => void }) => {
	return (
		<Button className="" size="icon" variant="ghost" onClick={onOpen}>
			<SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" />
		</Button>
	);
};
