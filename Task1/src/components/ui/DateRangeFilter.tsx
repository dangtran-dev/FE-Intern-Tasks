import { useInvoiceFilter } from "@/stores/useInvoiceFilter";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { ArrowTrendingUpIcon, CalendarIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "./button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./card";
import { Input } from "./input";
import { Label } from "./label";

const DateRangeFilter = () => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const setFilteredInvoices = useInvoiceFilter(
        (state) => state.setFilteredInvoices
    );
    const invoices = useInvoiceStore((state) => state.invoices);

    function handleQuery() {
        const invoicesFilter = invoices.filter((invoice) => {
            const date = dayjs(invoice.date, "YYYY-MM-DD HH:mm:ss");
            const start = dayjs(startDate, "YYYY-MM-DD HH:mm:ss");
            const end = dayjs(endDate, "YYYY-MM-DD HH:mm:ss");

            return (
                (date.isAfter(start) || date.isSame(start)) &&
                (date.isBefore(end) || date.isSame(end))
            );
        });

        setFilteredInvoices(invoicesFilter);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Truy Vấn Theo Khoảng Thời Gian
                </CardTitle>

                <CardDescription>
                    Chọn khoảng thời gian để phân tích dữ liệu giao dịch
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="start-date">Từ ngày</Label>

                        <Input
                            type="datetime-local"
                            id="start-date"
                            value={startDate}
                            onChange={(event) =>
                                setStartDate(
                                    dayjs(event.target.value).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )
                                )
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end-date">Đến ngày</Label>

                        <Input
                            type="datetime-local"
                            id="end-date"
                            value={endDate}
                            onChange={(event) =>
                                setEndDate(
                                    dayjs(event.target.value).format(
                                        "YYYY-MM-DD HH:mm:ss"
                                    )
                                )
                            }
                        />
                    </div>

                    <Button className="w-full" onClick={handleQuery}>
                        <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
                        Phân tích
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default DateRangeFilter;
