'use client';
import { DashboardViewLayout } from '@/components/DashboardViewLayout';
import { DataSet } from '@/components/DataSet';
import { DashboardLayout } from '@/components/layout/dashboard/DashboardLayout';
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Input,
} from '@/components/ui';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Pattern } from '@/lib/pattern/pattern';
import { getXataClient } from '@/lib/xata';
import { useState } from 'react';

export const EditTitleDialog = ({
	initialValue = '',
}: {
	initialValue?: string;
}) => {
	const [title, setTitle] = useState(initialValue);
	const handleSave = () => {}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="xs">
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit product title</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<Input
						id="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="col-span-3"
					/>
				</div>
				<DialogFooter>
					<Button type="submit">Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
