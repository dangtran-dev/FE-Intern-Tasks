import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { useState } from "react";
import z from "zod";

function App() {
    const [time, setTime] = useState("");
    const [quantity, setQuantity] = useState("0");
    const [pillar, setPillar] = useState("");
    const [turnover, setTurnover] = useState("0");
    const [unitPrice, setUnitPrice] = useState("0");

    const schema = z.object({
        quantity: z.number().positive("Số lượng phải lớn hơn 0"),
        pillar: z.string().min(1, "Vui lòng chọn trụ"),
        turnover: z.number().min(1000, "Doanh thu phải tối thiểu 1000 VND"),
        unitPrice: z.number().min(500, "Đơn giá phải tối thiểu 500 VND"),
    });

    type FormErrors = {
        quantity?: string[];
        pillar?: string[];
        turnover?: string[];
        unitPrice?: string[];
    };

    const [errors, setErrors] = useState<FormErrors>({});

    function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
        const formData = schema.safeParse({
            quantity: parseFloat(quantity),
            pillar: pillar,
            turnover: parseInt(turnover),
            unitPrice: parseInt(unitPrice),
        });

        if (!formData.success) {
            e.preventDefault();
            const errors = formData.error.flatten().fieldErrors;
            setErrors((e) => (e = errors));
            console.log(errors);
        } else {
            setErrors({});
        }
    }

    return (
        <div className="w-2xl p-10 m-auto">
            <header className="flex items-center justify-between">
                <h1 className="font-sans text-4xl font-bold">Nhập giao dịch</h1>

                <Button
                    type="submit"
                    form="transaction"
                    className="cursor-pointer"
                >
                    Cập nhật
                </Button>
            </header>

            <main className="mt-10">
                <form id="transaction" onSubmit={handleSubmitForm}>
                    <section>
                        <Label htmlFor="time">Thời gian</Label>

                        <Input
                            type="datetime-local"
                            id="time"
                            className="mt-3"
                            value={time}
                            required
                            onChange={(e) =>
                                setTime((t) => (t = e.target.value))
                            }
                        />
                    </section>

                    <section className="mt-5">
                        <Label
                            htmlFor="quantity"
                            className={errors.quantity && "text-destructive"}
                        >
                            Số lượng
                        </Label>

                        <Input
                            type="number"
                            step="any"
                            id="quantity"
                            className="mt-3"
                            value={quantity}
                            required
                            onChange={(e) =>
                                setQuantity((q) => (q = e.target.value))
                            }
                        />

                        {errors.quantity && (
                            <p className="text-[0.8rem] text-destructive">
                                {errors.quantity}
                            </p>
                        )}
                    </section>

                    <section className="mt-5">
                        <Label
                            htmlFor="pillar"
                            className={errors.pillar && "text-destructive"}
                        >
                            Trụ
                        </Label>

                        <Select
                            value={pillar}
                            required
                            onValueChange={(value) =>
                                setPillar((p) => (p = value))
                            }
                        >
                            <SelectTrigger className="w-full mt-3" id="pillar">
                                <SelectValue placeholder="Chọn trụ bơm" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    {Array.from({ length: 9 }, (_, i) => {
                                        const value = String(i + 1).padStart(
                                            2,
                                            "0"
                                        );
                                        return (
                                            <SelectItem
                                                className="w-full"
                                                key={value}
                                                value={value}
                                            >
                                                {`Trụ ${value}`}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {errors.pillar && (
                            <p className="text-[0.8rem] text-destructive">
                                {errors.pillar}
                            </p>
                        )}
                    </section>

                    <section className="mt-5">
                        <Label
                            htmlFor="turnover"
                            className={errors.turnover && "text-destructive"}
                        >
                            Doanh thu
                        </Label>

                        <Input
                            type="number"
                            id="turnover"
                            className="mt-3"
                            value={turnover}
                            required
                            onChange={(e) =>
                                setTurnover((tn) => (tn = e.target.value))
                            }
                        />

                        {errors.turnover && (
                            <p className="text-[0.8rem] text-destructive">
                                {errors.turnover}
                            </p>
                        )}
                    </section>

                    <section className="mt-5">
                        <Label
                            htmlFor="unitPrice"
                            className={errors.unitPrice && "text-destructive"}
                        >
                            Đơn giá
                        </Label>
                        <Input
                            type="number"
                            id="unitPrice"
                            className="mt-3"
                            value={unitPrice}
                            required
                            onChange={(e) =>
                                setUnitPrice((up) => (up = e.target.value))
                            }
                        />

                        {errors.unitPrice && (
                            <p className="text-[0.8rem] text-destructive">
                                {errors.unitPrice}
                            </p>
                        )}
                    </section>
                </form>
            </main>
        </div>
    );
}

export default App;
