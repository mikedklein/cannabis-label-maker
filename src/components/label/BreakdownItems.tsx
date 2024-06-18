import * as React from "react";

type Grid = React.HtmlHTMLAttributes<HTMLDivElement>;

export function Grid({ children, ...rest }: React.HtmlHTMLAttributes<HTMLDivElement>) {
    return (
        <div className="-mb-[2px] grid grid-cols-3 gap-y-0" {...rest}>
            {children}
        </div>
    );
}

export function Col({ children, ...rest }: React.HtmlHTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex flex-col gap-y-0" {...rest}>
            {children}
        </div>
    );
}

export function Row({ name, percentage }: { name: string; percentage: number }) {
    return (
        <div className="flex flex-row text-[9px] leading-none">
            <div>{name}</div>
            <div className="flex-grow" />
            <div>{percentage}%</div>
        </div>
    );
}
