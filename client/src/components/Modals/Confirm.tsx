import { toggleModal } from "@/store/app";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Trash } from "lucide-react";
import { memo } from "react";
import { Modal } from "rsuite";

const ConfirmModal: React.FC = () => {
  const { isModalOpen: isOpen, selectedLeads, onConfirmAction } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const handleClose = () => dispatch(toggleModal());

  return (
    <Modal size={"min(500px,100%)"} open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title className="!font-bold !text-xl">Please Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedLeads.length > 0
          ? `Are you sure you want to delete all ${selectedLeads.length} leads?`
          : "Are you sure you want to delete this lead?"}
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-2 w-full">
        <button
          onClick={handleClose}
          className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-white py-2 px-4 bg-gray-500 rounded-lg w-full sm:w-auto">
          Cancel
        </button>
        <button
          onClick={onConfirmAction}
          className="transition-all flex items-center justify-center gap-2 outline-none cursor-pointer hover:shadow text-white py-2 px-4 bg-red-500 rounded-lg w-full sm:w-auto">
          <Trash size={18} />
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default memo(ConfirmModal);
