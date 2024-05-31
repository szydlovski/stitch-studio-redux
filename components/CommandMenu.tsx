'use client';
import { BrushIcon, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import React from 'react';
import { MENU_LINKS } from './layout/links';
import { Dialog } from '@/components/ui/dialog';
import {
	CreateProductDialogContent,
	FilePatternPayload,
} from '@/app/app/products/CreateProductDialog';
import { globalSearch } from '../actions/globalSearch';
import debounce from 'lodash.debounce';
import { ProductRecord } from '@/lib/xata';
import Image from 'next/image';

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type SearchResult = ArrayElement<
	Awaited<ReturnType<typeof globalSearch>>['results']
>;

export function CommandMenu() {
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
		const { total, results } = await globalSearch(value);
		setSearchResults(results);
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
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
							onFocus={() => setOpen(true)}
						/>
					</div>
				</form>
			</div>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					value={searchTerm}
					placeholder="Type a command or search..."
					onChangeCapture={async (evt) => {
						const searchTerm = evt.currentTarget.value;
						setSearchTerm(searchTerm);
						if (searchTerm.length >= 3) debounced(searchTerm);
					}}
				/>
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					{searchTerm.length >= 3 && searchResults && (
						<CommandGroup heading="Search">
							{searchResults.map(({ table, record }) => {
								return (
									<CommandItem
										className="flex gap-2"
										key={record.id}
										value={record.title}
										onSelect={() => router.push(`/app/products/${record.id}`)}
									>
										<div className="h-[20px] w-[20px] flex">
											<Image
												src={record.thumbnail!.signedUrl!}
												width={record.thumbnail!.attributes!.width!}
												height={record.thumbnail!.attributes!.height!}
												alt={record.title!}
											/>
										</div>
										{record.title}
									</CommandItem>
								);
							})}
						</CommandGroup>
					)}
					<CommandGroup heading="Navigation">
						{MENU_LINKS.map(({ href, label, icon: Icon }) => (
							<CommandItem
								className="flex gap-2"
								key={label}
								value={label}
								onSelect={() => router.push(href)}
							>
								<Icon className="opacity-75" />
								{label}
							</CommandItem>
						))}
					</CommandGroup>
					<CommandGroup heading="Actions">
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
