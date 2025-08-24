import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import { Card, CardContent } from "./card";
import { useInvoiceFilter } from "@/stores/useInvoiceFilter";

const RevenueCard = () => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const total = useInvoiceFilter((state) => state.total);

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">
                            Tổng Doanh Thu
                        </p>
                        <p className="text-2xl font-bold text-primary">
                            {formatCurrency(total)}
                        </p>
                    </div>
                    <CurrencyDollarIcon className="h-8 w-8 text-primary" />
                </div>
            </CardContent>
        </Card>
    );
};

export default RevenueCard;
