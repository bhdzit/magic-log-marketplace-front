import { create } from "zustand";

type DialogState = {
  [dialogId: string]: boolean;
};

type DialogStore = {
  dialogs: DialogState;
  openDialog: (id: string) => void;
  closeDialog: (id: string) => void;
  toggleDialog: (id: string) => void;
  isOpen: (id: string) => boolean;
};

export const useDialog = create<DialogStore>((set, get) => ({
  dialogs: {},
  openDialog: (id) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [id]: true },
    })),
  closeDialog: (id) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [id]: false },
    })),
  toggleDialog: (id) =>
    set((state) => ({
      dialogs: { ...state.dialogs, [id]: !state.dialogs[id] },
    })),
  isOpen: (id) => !!get().dialogs[id],
}));
