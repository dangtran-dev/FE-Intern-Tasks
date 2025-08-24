import { ChartBarIcon } from "@heroicons/react/24/solid";

const Header = () => {
    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <ChartBarIcon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold font-sans text-foreground">
                            Phân Tích Báo Cáo Giao Dịch
                        </h1>
                        <p className="text-muted-foreground font-sans">
                            Hệ thống quản lý và phân tích dữ liệu giao dịch cửa
                            hàng xăng dầu
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
