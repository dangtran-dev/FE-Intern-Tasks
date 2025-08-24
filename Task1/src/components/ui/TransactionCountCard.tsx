import { ChartBarIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "./card";
import { useInvoiceFilter } from "@/stores/useInvoiceFilter";

const TransactionCountCard = () => {
    const invoicesFilter = useInvoiceFilter((state) => state.invoices);

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Số Giao Dịch
                        </p>
                        <p className="text-2xl font-bold text-accent">
                            {invoicesFilter.length}
                        </p>
                    </div>
                    <ChartBarIcon className="h-8 w-8 text-accent" />
                </div>
            </CardContent>
        </Card>
    );
};

export default TransactionCountCard;
