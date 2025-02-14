import { IOverlayProps } from "@/types/overlay";
import { Trash } from "lucide-react";
import { Modal } from "rsuite";

interface IProps extends IOverlayProps {
  title: string;
  subtitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, title, subtitle, onCancel, onConfirm, close }: IProps) {
  return (
    <Modal size={"min(500px,100%)"} open={isOpen} onClose={close}>
      <Modal.Header>
        <Modal.Title className="!font-bold !text-xl">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{subtitle}</Modal.Body>
      <Modal.Footer className="flex justify-end gap-2 w-full">
        <button
          onClick={onCancel}
          className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-white py-2 px-4 bg-gray-500 rounded-lg w-full sm:w-auto">
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-white py-2 px-4 bg-red-500 rounded-lg w-full sm:w-auto">
          <Trash size={18} />
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
}
