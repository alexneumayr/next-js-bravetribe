import { Button } from '@/components/shadcn/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import type { Template } from '@prisma/client';
import { useRouter } from 'next/navigation';

type Props = {
  template: Template;
  onClose: () => void;
};

export default function TemplatePreviewDialog({ template, onClose }: Props) {
  const router = useRouter();
  return (
    <div>
      <Dialog defaultOpen onOpenChange={() => onClose()}>
        <DialogContent
          className="max-w-[425px] [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <p className="font-semibold text-2xl">Preview challenge</p>

              <p className="hidden sm:block text-zinc-500 text-sm font-medium">
                Here you can preview the selected challenge.
              </p>
            </DialogTitle>
          </DialogHeader>
          <h3 className="text-2xl font-medium">{template.title}</h3>
          <p className="text-sm font-medium">{template.description}</p>
          <DialogFooter>
            <div className="flex justify-around w-full gap-x-2 mt-4">
              <Button
                variant="secondary"
                className="w-full"
                type="button"
                onClick={() =>
                  router.push(
                    `/main/challenges/newchallenge?template=${template.id}`,
                  )
                }
              >
                Accept challenge
              </Button>
              <DialogClose asChild>
                <Button variant="default" className="w-full" type="button">
                  Different challenge
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
