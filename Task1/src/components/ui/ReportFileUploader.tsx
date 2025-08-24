import { cn } from "@/lib/utils";
import { useFileStore } from "@/stores/useFileStore";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { ArrowUpTrayIcon, DocumentTextIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import * as XLSX from "xlsx";
import { Badge } from "./badge";
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
dayjs.extend(customParseFormat);

const ReportFileUploader = () => {
    const file = useFileStore((state) => state.file);
    const setFile = useFileStore((state) => state.setFile);
    const uploaded = useFileStore((state) => state.uploaded);
    const setUploaded = useFileStore((state) => state.setUploaded);

    const setInvoices = useInvoiceStore((state) => state.setInvoices);

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const fileInput = e.target.files?.[0];

        if (fileInput) {
            setFile(fileInput);
            setUploaded(true);
            const reader = new FileReader();
            reader.readAsArrayBuffer(fileInput);

            reader.onload = (e) => {
                const data = e.target?.result;
                try {
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const parsedData = XLSX.utils.sheet_to_json(sheet, {
                        range: 7,
                    });

                    const invoices = parsedData.map((row: any) => {
                        return {
                            id: crypto.randomUUID(),
                            date: dayjs(
                                row["Ngày"] + " " + row["Giờ"],
                                "DD/MM/YYYY HH:mm:ss"
                            ).format("YYYY-MM-DD HH:mm:ss"),
                            product: row["Mặt hàng"],
                            total: row["Thành tiền (VNĐ)"],
                        };
                    });

                    setInvoices(invoices);
                } catch (error) {
                    console.error("Lỗi đọc file Excel:", error);
                    setUploaded(false);
                }
            };
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ArrowUpTrayIcon className="h-5 w-5" />

                    <span>Tải Lên File Báo Cáo</span>
                </CardTitle>

                <CardDescription>
                    Chọn file Excel (.xlsx) chứa dữ liệu giao dịch hàng ngày
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div
                    className={cn(
                        "border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors",
                        uploaded ? "border-accent bg-accent/5" : ""
                    )}
                >
                    {uploaded ? (
                        <div className="space-y-2">
                            <DocumentTextIcon className="h-12 w-12 text-accent mx-auto" />

                            <p className="font-medium text-foreground">
                                {file?.name}
                            </p>

                            <Badge variant="secondary">
                                Đã tải lên thành công
                            </Badge>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <ArrowUpTrayIcon className="h-12 w-12 text-muted-foreground mx-auto" />

                            <div>
                                <p className="text-lg font-medium">
                                    Tải file lên
                                </p>
                            </div>

                            <div>
                                <Input
                                    type="file"
                                    accept=".xlsx"
                                    className="hidden"
                                    name="file-upload"
                                    id="file-upload"
                                    onChange={handleFileInputChange}
                                />

                                <Label htmlFor="file-upload">
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-transparent"
                                        asChild
                                    >
                                        <span>Chọn File Excel</span>
                                    </Button>
                                </Label>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default ReportFileUploader;
