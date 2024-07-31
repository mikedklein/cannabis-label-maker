import React from "react";
import path from "path";
import satori from "satori";
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
    const generateSVG = async () => {
        const response = await fetch("./src/assets/fonts/district/district.ttf");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const districtArrayBuffer = await response.arrayBuffer();

        const svg = await satori(
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                    fontSize: 32,
                    fontWeight: 600,
                }}
            >
                <div style={{ fontSize: "54px" }}>{strainName}</div>
                <hr style={{ margin: "2px 0", width: "100%", borderColor: "#000" }} />
            </div>,
            {
                width: 216,
                height: 120,
                fonts: [
                    {
                        name: "District",
                        // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
                        data: districtArrayBuffer,
                        weight: 400,
                        style: "normal",
                    },
                ],
            }
        );
        return svg;
    };

    const downloadSVG = async () => {
        const svg = await generateSVG();

        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "label.svg";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col items-center gap-y-2">
            <h2 className="font-special text-[50px]">Label Proof</h2>
            <div className="my-5 rounded-md border border-gray-300 p-2">
                <div className="h-[1.25in] w-[2.25in]">
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

            <Button onClick={downloadSVG}>Save Label</Button>
        </div>
    );
};

export default Label;
