'use client';
import { Button } from '@/components/ui';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { WandSparklesIcon } from 'lucide-react';
import { useProductContext } from '@/components/context/ProductContext';
import {
	CoverGeneratorProvider,
	useCoverGeneratorContext,
} from './CoverGeneratorContext';
import { Stepper } from './Stepper';
import { CoverGeneratorSteps, CoverGeneratorStepOrder } from './CoverGeneratorSteps';
import { useDisclosure } from '@/lib/hooks/useDisclosure';
import { RendererProvider } from '@/components/context/RendererContext';

export const CoverGeneratorDialogContent = () => {
	const {
		stepper: { step, setStep },
	} = useCoverGeneratorContext();
	const { component: StepComponent } = CoverGeneratorSteps[step];
	return (
		<DialogContent className="flex max-w-5xl p-0 gap-0">
			<div className="flex col-span-2 bg-muted p-6 rounded-md rounded-r-none">
				<Stepper
					onStepClick={(key) => setStep(key)}
					value={step}
					steps={CoverGeneratorStepOrder.map((key) => {
						const config = CoverGeneratorSteps[key];
						return {
							key: config.key,
							title: config.title,
							description: config.description,
						};
					})}
				/>
			</div>
			<div className="flex flex-col flex-1 col-span-4 p-6">
				<StepComponent />
			</div>
		</DialogContent>
	);
};

export const CoverGeneratorDialog = () => {
	const { product, pattern } = useProductContext();
	const { state: isOpen, set: setOpen, close } = useDisclosure();
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="xs" variant="outline" className="flex gap-1">
					<WandSparklesIcon size={16} />
					<span>{'Cover generator'}</span>
				</Button>
			</DialogTrigger>
			<CoverGeneratorProvider product={product} onClose={close}>
				<RendererProvider>
					<CoverGeneratorDialogContent />
				</RendererProvider>
			</CoverGeneratorProvider>
		</Dialog>
	);
};
