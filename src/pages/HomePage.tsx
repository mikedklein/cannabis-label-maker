import React, { useState } from "react";
import ToggleTheme from "@/components/ToggleTheme";
import { useTranslation } from "react-i18next";
import LangToggle from "@/components/LangToggle";
import Label from "@/components/label/Label";
import { Input } from "@/components/ui/input";
import { Label as ShadCnLabel } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const TERPENES = [
    { name: "α-Pinene", percentage: 0.05, id: "alphaPinene" },
    { name: "β-Pinene", percentage: 0.05, id: "betaPinene" },
    { name: "β-Mycrene", percentage: 0.05, id: "betaMycrene" },
    { name: "Δ-Limonene", percentage: 0.05, id: "deltaLimonene" },
    { name: "Terpinolene", percentage: 0.05, id: "terpinolene" },
    { name: "Ocimene", percentage: 0.05, id: "ocimene" },
    { name: "Linalool", percentage: 0.05, id: "linalool" },
    { name: "β-Caryophyllene", percentage: 0.05, id: "betaCaryophyllene" },
    { name: "β-Eudesmol", percentage: 0.05, id: "betaEudesmol" },
    { name: "Caryophyllene Oxide", percentage: 0.05, id: "caryophylleneOxide" },
    { name: "Trans Nerolidol", percentage: 0.05, id: "transNerolidol" },
];

export default function HomePage() {
    const [strainName, setStrainName] = useState("Gelato Cake");
    const [terpenes, setTerpenes] = useState<{ name: string; percentage: number }[]>([]);
    const [thcaLevel, setThcaLevel] = useState(0);
    const [cbdaLevel, setCbdaLevel] = useState(0);
    const [totalThc, setTotalThc] = useState(0);
    const [totalCbd, setTotalCbd] = useState(0);
    const [alphaPinene, setAlphaPinene] = useState(0.05);
    const [betaPinene, setBetaPinene] = useState(0.05);
    const [betaMycrene, setBetaMycrene] = useState(0.05);
    const [deltaLimonene, setDeltaLimonene] = useState(0.05);
    const [terpinolene, setTerpinolene] = useState(0.05);
    const [ocimene, setOcimene] = useState(0.05);
    const [linalool, setLinalool] = useState(0.05);
    const [betaCaryophyllene, setBetaCaryophyllene] = useState(0.05);
    const [betaEudesmol, setBetaEudesmol] = useState(0.05);
    const [caryophylleneOxide, setCaryophylleneOxide] = useState(0.05);
    const [transNerolidol, setTransNerolidol] = useState(0.05);
    const [expDate, setExpDate] = useState(new Date().toLocaleDateString("en-US"));
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
            <div className="max-w-screen flex h-screen flex-col items-center justify-center gap-2 overflow-y-auto">
                <h1 className="font-special text-[120px]">{t("title")}</h1>
                <div className="w-full p-4">
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
                    <h1 className="font-special text-[50px]">Terpenes</h1>

                    <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-4">
                        {TERPENES.map((terpene, index) => (
                            <div key={index} className="flex flex-col">
                                <ShadCnLabel className="mb-2" htmlFor={terpene.id}>
                                    {terpene.name}
                                </ShadCnLabel>
                                <Input
                                    type="number"
                                    id={terpene.id}
                                    name={terpene.id}
                                    value={terpene.percentage}
                                    onChange={(e) =>
                                        handleTerpeneChange(
                                            index,
                                            "percentage",
                                            parseFloat(e.target.value)
                                        )
                                    }
                                    className="mr-2"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <ShadCnLabel htmlFor="expDate">Exp Date</ShadCnLabel>
                        <Input
                            id="expDate"
                            type="date"
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
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
                        expDate={expDate}
                        packageSize={packageSize}
                    />
                </div>
                <LangToggle />
                <ToggleTheme />
            </div>
        </>
    );
}
