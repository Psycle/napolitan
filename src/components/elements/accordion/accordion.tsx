import { useCallback, useMemo, useState } from "react";
import './accordion.scss';

type AccordionProps = React.HTMLAttributes<HTMLDivElement>;

function getAccordionClassName(props: AccordionProps): string {
    return [
        props.className,
        'accordion',
    ].filter(Boolean).join(' ');
}

export function Accordion(props: AccordionProps) {

    const allProps = useMemo(() => {
        return {
            ...props,
            className: getAccordionClassName(props),
        };
    }, [props]);

    return (
        <div {...allProps} />
    );
}

type AccordionItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    open?: boolean | undefined;
};

function getAccordionItemClassName(props: AccordionItemProps): string {
    return [
        props.className,
        'accordion-item',
        `accordion-item-open-${!!props.open}`,
    ].filter(Boolean).join(' ');
}

export function AccordionItem(props: AccordionItemProps) {

    const [localOpen, setLocalOpen] = useState(false);

    const usedOpen = props.open ?? localOpen;

    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        if (props.onClick) {
            props.onClick(event);
        }
        if (!event.defaultPrevented) {
            setLocalOpen(!localOpen);
        }
    }, [props.onClick, localOpen]);

    const allProps = useMemo(() => {
        return {
            ...props,
            className: getAccordionItemClassName({ ...props, open: usedOpen }),
        };
    }, [props, usedOpen]);

    return (
        <button {...allProps} onClick={handleClick} />
    );
}

type AccordionHeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
};

function getAccordionHeadingClassName(props: AccordionHeadingProps): string {
    return [
        props.className,
        'accordion-heading',
    ].filter(Boolean).join(' ');
}

export function AccordionHeading(props: AccordionHeadingProps) {

    const [children, rest] = useMemo(() => {
        return [props.children, {
            ...props,
            className: getAccordionHeadingClassName(props),
        }];
    }, [props]);

    return (
        <h1 {...rest}>
            <span className="accordion-heading-heading">{children}</span>
            <span className="accordion-heading-glyph">
                <span className="accordion-heading-glyph-horizontal"></span>
                <span className="accordion-heading-glyph-vertical"></span>
            </span>
        </h1>
    );
}

type AccordionBodyProps = React.HTMLAttributes<HTMLDivElement> & {
};

function getAccordionBodyClassName(props: AccordionBodyProps): string {
    return [
        props.className,
        'accordion-body',
    ].filter(Boolean).join(' ');
}

export function AccordionBody(props: AccordionBodyProps) {

    const allProps = useMemo(() => {
        return {
            ...props,
            className: getAccordionBodyClassName(props),
        };
    }, [props]);

    return (
        <div {...allProps} />
    );
}