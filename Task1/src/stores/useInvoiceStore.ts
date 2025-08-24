import { create } from "zustand";

type Invoice = {
    id: string;
    date: string;
    product: string;
    total: number;
};

type InvoiceState = {
    invoices: Invoice[];

    setInvoices: (invoices: Invoice[]) => void;
    addInvoice: (invoice: Invoice) => void;
};

export const useInvoiceStore = create<InvoiceState>((set) => ({
    invoices: [],

    setInvoices: (invoices) => set({ invoices }),
    addInvoice: (invoice) =>
        set((state) => ({ invoices: { ...state.invoices, invoice } })),
}));
