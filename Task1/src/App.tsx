import DateRangeFilter from "./components/ui/DateRangeFilter";
import Header from "./components/ui/Header";
import ReportFileUploader from "./components/ui/ReportFileUploader";
import RevenueCard from "./components/ui/RevenueCard";
import TransactionCountCard from "./components/ui/TransactionCountCard";
import { useFileStore } from "./stores/useFileStore";
import { useInvoiceFilter } from "./stores/useInvoiceFilter";

function App() {
    const uploaded = useFileStore((state) => state.uploaded);
    const invoicesFilter = useInvoiceFilter((state) => state.invoices);

    console.log(invoicesFilter);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 space-y-8">
                <ReportFileUploader />

                {uploaded && <DateRangeFilter />}

                {invoicesFilter.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <RevenueCard />

                        <TransactionCountCard />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
