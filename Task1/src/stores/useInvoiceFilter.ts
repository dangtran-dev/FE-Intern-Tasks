import { create } from "zustand";

type Invoice = {
    id: string;
    date: string;
    product: string;
    total: number;
};

type InvoiceFilterStatus = {
    invoices: Invoice[];
    total: number;

    setFilteredInvoices: (invoices: Invoice[]) => void;
};

export const useInvoiceFilter = create<InvoiceFilterStatus>((set) => ({
    invoices: [],
    total: 0,

    setFilteredInvoices: (invoices) =>
        set(() => {
            const total = invoices.reduce(
                (sum, invoice) => sum + invoice.total,
                0
            );

            return {
                invoices: invoices,
                total: total,
            };
        }),
}));
