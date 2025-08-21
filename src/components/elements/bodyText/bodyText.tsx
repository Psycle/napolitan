import { useMemo } from "react";
import './bodyText.scss';

type BodyTextProps = React.HTMLAttributes<HTMLDivElement>;

export function BodyText(props: BodyTextProps) {

    const [children, ...rest] = useMemo(() => {
        const { children, className, ...rest } = props;
        const fullClassName = `body-text ${className || ''}`;
        return [children, { ...rest, className: fullClassName }];
    }, [props]);

    return (
        <div {...rest}>
            {children}
        </div>
    )
}