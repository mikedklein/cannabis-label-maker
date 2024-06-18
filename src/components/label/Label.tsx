import React from "react";
import { Button } from "@/components/ui/button";
import { Col, Grid, Row } from "@/components/label/BreakdownItems";

interface LabelProps {
    strainName: string;
    terpenes: { name: string; percentage: number }[];
    thcaLevel: number;
    cbdaLevel: number;
    totalThc: number;
    totalCbd: number;
    expDate: string;
    packageSize: string;
}

const Label: React.FC<LabelProps> = ({
    strainName,
    terpenes,
    thcaLevel,
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
            <div className="rounded-md border border-gray-300 p-2">
                <div ref={labelRef} className="h-[1.25in] w-[2.25in]">
                    <div className="font-special -mb-[10px] text-[54px] leading-none">
                        {strainName}
                    </div>
                    <hr className="my-[2px] border-gray-300" />
                    <Grid>
                        <Col>
                            <Row name="THCa" percentage={thcaLevel} />
                            <Row name="CBDa" percentage={cbdaLevel} />
                            <Row name="Total THC%" percentage={totalThc} />
                            <Row name="Total CBD%" percentage={totalCbd} />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Grid>

                    <hr className="my-[2px] border-gray-300" />
                    <div className="text-[9px]">Exp Date: {expDate}</div>
                    <div className="text-[9px]">Package Size: {packageSize}</div>
                </div>
            </div>

            <Button onClick={printLabel}>Print Label</Button>
        </div>
    );
};

export default Label;
