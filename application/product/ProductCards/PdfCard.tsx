'use client';
import { useProductContext } from '@/presentation/components/context/ProductContext';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/presentation/components/ui';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import { BookOpenTextIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

export const PdfCard = () => {
	const { product } = useProductContext();
	const { state: show, toggle } = useDisclosure();
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<span>{'Files'}</span>
					<div className="ml-auto flex gap-2">
						<Button variant='outline' size="xs" asChild>
							<Link
								href={`/api/products/${product.id}/pdf-preview`}
								className="flex gap-1"
								target="_blank"
							>
								<ExternalLinkIcon size={16} />
								<span>{'Open preview'}</span>
							</Link>
						</Button>
						<Button size="xs" onClick={toggle} className="flex gap-1">
							<BookOpenTextIcon size={16} />
							<span>{show ? 'Hide' : 'Preview PDF'}</span>
						</Button>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{show && (
					<iframe
						src={`/api/products/${product.id}/pdf-preview`}
						className="w-full h-[600px]"
					/>
				)}
			</CardContent>
		</Card>
	);
};
