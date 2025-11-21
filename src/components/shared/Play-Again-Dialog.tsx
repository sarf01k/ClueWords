import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import type { ReactNode } from "react";

interface DialogProps {
  trigger: ReactNode;
  onConfirm: () => void;
}

export default function PlayAgainDialog({ trigger, onConfirm }: DialogProps) {
  return (
    <Dialog>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Content className="w-11/12 md:w-sm" size="sm">
        <Dialog.Header>
          <Text as="h5">Play again?</Text>
        </Dialog.Header>
        <section className="flex flex-col gap-4 p-4">
          <p className="text-lg">This won't overwrite your previous score.</p>
          <section className="flex w-full justify-end">
            <Dialog.Trigger asChild>
              <Button onClick={onConfirm}>Play</Button>
            </Dialog.Trigger>
          </section>
        </section>
      </Dialog.Content>
    </Dialog>
  );
}
