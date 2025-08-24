import { create } from "zustand";

type FileStatus = {
    file: File | null;
    uploaded: boolean;

    setFile: (file: File | null) => void;
    setUploaded: (uploaded: boolean) => void;
};

export const useFileStore = create<FileStatus>((set) => ({
    file: null,
    uploaded: false,
    setFile: (file) => set({ file }),
    setUploaded: (uploaded) => set({ uploaded }),
}));
