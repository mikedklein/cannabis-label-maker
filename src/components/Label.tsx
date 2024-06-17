import React from "react";
import { Button } from "./ui/button";

interface LabelProps {
    strainName: string;
    terpenes: { name: string; percentage: number }[];
    thcaLevel: number;
    cbdaLevel: number;
    totalThc: number;
    totalCbd: number;
    manufactureDate: string;
    packageSize: string;
}

const Label: React.FC<LabelProps> = ({
    strainName,
    terpenes,
    thcaLevel,
    cbdaLevel,
    totalCbd,
    totalThc,
    manufactureDate,
    packageSize,
}) => {
    const labelRef = React.useRef<HTMLDivElement>(null);

    const printLabel = () => {
        const printWindow = window.open("", "_blank");
        const node = labelRef.current;
        if (printWindow && node) {
            printWindow.document.write(node.outerHTML);
            printWindow.document.close();
            printWindow.print();
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-2">
            <div className="rounded-md border border-gray-300 p-2">
                <div ref={labelRef} className="h-[1.25in] w-[2.25in]">
                    <div className="font-custom">{strainName}</div>
                    <hr className="my-1 border-gray-300" />
                    <div className="grid grid-cols-3 gap-1">
                        <div>
                            <div className="text-[9px]">THCa: {thcaLevel}%</div>
                            <div className="text-[9px]">CBDa: {cbdaLevel}%</div>
                            <div className="text-[9px]">Total THC%: {totalThc}%</div>
                            <div className="text-[9px]">Total CBD%: {totalCbd}%</div>
                        </div>
                        <div>
                            {terpenes.slice(0, 5).map((terpene, index) => (
                                <div key={index} className="text-[9px]">
                                    {terpene.name}: {terpene.percentage}%
                                </div>
                            ))}
                        </div>
                        <div>
                            {terpenes.slice(5, 10).map((terpene, index) => (
                                <div key={index} className="text-sm">
                                    {terpene.name}: {terpene.percentage}%
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="my-1 border-gray-300" />
                    <div className="text-[9px]">Manufacture Date: {manufactureDate}</div>
                    <div className="text-[9px]">Package Size: {packageSize}</div>
                </div>
            </div>

            <Button onClick={printLabel}>Print Label</Button>
        </div>
    );
};

export default Label;
