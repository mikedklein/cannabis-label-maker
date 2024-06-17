import React, { useState } from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Label from "@/components/Label";
import { Input } from "@/components/ui/input";
import { Label as ShadCnLabel } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function HomePage() {
    const [strainName, setStrainName] = useState("Gelato Cake");
    const [terpenes, setTerpenes] = useState<{ name: string; percentage: number }[]>([]);
    const [thcaLevel, setThcaLevel] = useState(0);
    const [cbdaLevel, setCbdaLevel] = useState(0);
    const [totalThc, setTotalThc] = useState(0);
    const [totalCbd, setTotalCbd] = useState(0);
    const [manufactureDate, setManufactureDate] = useState("");
    const [packageSize, setPackageSize] = useState("");
    const { t } = useTranslation();

    const handleTerpeneChange = (index: number, field: string, value: string | number) => {
        const newTerpenes = [...terpenes];
        if (field === "name") newTerpenes[index].name = value as string;
        if (field === "percentage") newTerpenes[index].percentage = value as number;
        setTerpenes(newTerpenes);
    };

    const addTerpene = () => {
        setTerpenes([...terpenes, { name: "", percentage: 0 }]);
    };

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center gap-2">
                <h1 className="text-4xl font-bold">{t("title")}</h1>
                <div className="p-4">
                    <div className="mb-4">
                        <ShadCnLabel htmlFor="strainName">Strain Name</ShadCnLabel>
                        <Input
                            id="strainName"
                            type="text"
                            value={strainName}
                            onChange={(e) => setStrainName(e.target.value)}
                            placeholder="Enter strain name"
                            className="mb-2"
                        />
                    </div>

                    <div className="mb-4 flex flex-row gap-x-2">
                        <div>
                            <ShadCnLabel htmlFor="thcaLevel">THCa (%)</ShadCnLabel>
                            <Input
                                id="thcaLevel"
                                type="number"
                                value={thcaLevel}
                                onChange={(e) => setThcaLevel(parseFloat(e.target.value))}
                                placeholder="Enter THCa level"
                            />
                        </div>
                        <div>
                            <ShadCnLabel htmlFor="totalThc">Total THC (%)</ShadCnLabel>
                            <Input
                                id="totalThc"
                                type="number"
                                value={totalThc}
                                onChange={(e) => setTotalThc(parseFloat(e.target.value))}
                                placeholder="Enter Total THC %"
                            />
                        </div>
                    </div>

                    <div className="mb-4 flex flex-row gap-x-2">
                        <div>
                            <ShadCnLabel htmlFor="cbdLevel">CBDa (%)</ShadCnLabel>
                            <Input
                                id="cbdaLevel"
                                type="number"
                                value={cbdaLevel}
                                onChange={(e) => setCbdaLevel(parseFloat(e.target.value))}
                                placeholder="Enter CBDa level"
                            />
                        </div>
                        <div>
                            <ShadCnLabel htmlFor="totalCbd">Total CBD (%)</ShadCnLabel>
                            <Input
                                id="totalCbd"
                                type="number"
                                value={totalCbd}
                                onChange={(e) => setTotalCbd(parseFloat(e.target.value))}
                                placeholder="Enter Total CBD %"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <ShadCnLabel>Terpenes</ShadCnLabel>
                        {terpenes.map((terpene, index) => (
                            <div key={index} className="mb-2 flex">
                                <Input
                                    type="text"
                                    placeholder="Terpene Name"
                                    value={terpene.name}
                                    onChange={(e) =>
                                        handleTerpeneChange(index, "name", e.target.value)
                                    }
                                    className="mr-2"
                                />
                                <Input
                                    type="number"
                                    placeholder="Percentage"
                                    value={terpene.percentage}
                                    onChange={(e) =>
                                        handleTerpeneChange(
                                            index,
                                            "percentage",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                />
                            </div>
                        ))}
                        <Button onClick={addTerpene}>Add Terpene</Button>
                    </div>

                    <div className="mb-4">
                        <ShadCnLabel htmlFor="manufactureDate">Manufacture Date</ShadCnLabel>
                        <Input
                            id="manufactureDate"
                            type="date"
                            value={manufactureDate}
                            onChange={(e) => setManufactureDate(e.target.value)}
                            className="mb-2"
                        />
                    </div>

                    <div className="mb-4">
                        <ShadCnLabel htmlFor="packageSize">Package Size</ShadCnLabel>
                        <Input
                            id="packageSize"
                            type="text"
                            value={packageSize}
                            onChange={(e) => setPackageSize(e.target.value)}
                            placeholder="Enter package size"
                            className="mb-2"
                        />
                    </div>

                    <Label
                        strainName={strainName}
                        terpenes={terpenes}
                        thcaLevel={thcaLevel}
                        cbdaLevel={cbdaLevel}
                        totalThc={totalThc}
                        totalCbd={totalCbd}
                        manufactureDate={manufactureDate}
                        packageSize={packageSize}
                    />
                </div>
                <LangToggle />
                <ToggleTheme />
            </div>
        </>
    );
}
