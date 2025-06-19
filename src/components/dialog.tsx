import { type JSX } from "react";
import { X } from "lucide-react";
import { useDialog } from "../hooks/use-dialog";
const MagicLogDialog = ({
  children: [triggerElement, dialogBody],
  dialogName,
}: {
  children: JSX.Element[];
  dialogName: string;
}) => {
  const { openDialog, closeDialog, isOpen } = useDialog();
  return (
    <div>
      <div
        onClick={() => {
          openDialog(dialogName);
        }}
      >
        {triggerElement}
      </div>
      <dialog open={isOpen(dialogName)}>
        <div className="fixed inset-0 bg-gray-500/75 transition-opacity">
          <div
            className="relative flex justify-center items-center min-h-screen"
            onClick={(e) => {
              if (e.currentTarget === e.target) {
                //setShowDialog(false);
                console.log("Oculto");
              }
            }}
          >
            <div className="relative min-w-[90vw] md:min-w-[40vw] bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg shadow-lg">
              <X
                className="cursor-pointer absolute top-3 right-3 cur"
                onClick={() => {
                  closeDialog(dialogName);
                }}
              />
              {dialogBody}
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MagicLogDialog;
