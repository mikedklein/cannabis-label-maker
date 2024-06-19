import React from "react";
import { Button } from "@/components/ui/button";
import { Col, Grid, Row } from "@/components/label/BreakdownItems";

interface LabelProps {
    strainName: string;
    terpenes: { name: string; percentage: number }[];
    d9thcLevel: number;
    cbdaLevel: number;
    totalThc: number;
    totalCbd: number;
    expDate: string;
    packageSize: string;
}

const Label: React.FC<LabelProps> = ({
    strainName,
    terpenes,
    d9thcLevel,
    cbdaLevel,
    totalCbd,
    totalThc,
    expDate,
    packageSize,
}) => {
    const labelRef = React.useRef<HTMLDivElement>(null);

    const printLabel = () => {
        const printWindow = window.open("", "_blank");
        const node = labelRef.current;
        if (printWindow && node) {
            // Copy all stylesheets
            Array.from(document.styleSheets).forEach((styleSheet) => {
                if (styleSheet.href) {
                    const newLinkEl = printWindow.document.createElement("link");
                    newLinkEl.rel = "stylesheet";
                    newLinkEl.href = styleSheet.href;
                    printWindow.document.head.appendChild(newLinkEl);
                } else if (styleSheet.cssRules) {
                    const newStyleEl = printWindow.document.createElement("style");
                    Array.from(styleSheet.cssRules).forEach((cssRule) => {
                        newStyleEl.appendChild(
                            printWindow.document.createTextNode(cssRule.cssText)
                        );
                    });
                    printWindow.document.head.appendChild(newStyleEl);
                }
            });

            // Write the HTML
            printWindow.document.body.innerHTML = node.outerHTML;

            setTimeout(() => {
                printWindow.document.close();
                printWindow.print();
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-2">
            <h2 className="font-special text-[50px]">Label Proof</h2>
            <div className="my-5 rounded-md border border-gray-300 p-2">
                <div ref={labelRef} className="h-[1.25in] w-[2.25in]">
                    <div className="-mb-[10px] font-special text-[54px] leading-none">
                        {strainName}
                    </div>
                    <hr className="my-[2px] border-gray-300" />
                    <Grid>
                        <Col>
                            <Row name="Δ9 THC" percentage={d9thcLevel} />
                            <Row name="CBDa" percentage={cbdaLevel} />
                            <Row name="Total THC%" percentage={totalThc} />
                            <Row name="Total CBD%" percentage={totalCbd} />
                        </Col>
                        <Col>
                            {terpenes.slice(0, 5).map((terpene) => (
                                <Row
                                    key={terpene.name}
                                    name={terpene.name}
                                    percentage={terpene.percentage}
                                />
                            ))}
                        </Col>
                        <Col>
                            {terpenes.slice(6, 10).map((terpene) => (
                                <Row
                                    key={terpene.name}
                                    name={terpene.name}
                                    percentage={terpene.percentage}
                                />
                            ))}
                        </Col>
                    </Grid>

                    <hr className="my-[2px] border-gray-300" />
                    <div className="w-full text-[8px]">
                        <div className="flex w-full flex-row">
                            <div>Exp Date: {expDate}</div>
                            <div className="flex-grow" />
                            <div>Batch Id: ABCA1234567890123445</div>
                        </div>
                        <div className="flex w-full flex-row">
                            <div className="text-[9px]">Package Size: {packageSize}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Button onClick={printLabel}>Print Label</Button>
        </div>
    );
};

export default Label;
