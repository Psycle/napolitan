import { useMemo } from "react";
import { Link, type LinkProps } from "react-router";
import './button.scss';

function getButtonClassName(props: ButtonProps | ButtonLinkProps): string {
    return [
        props.className,
        'button',
        `button-wrap-${props.wrap || false}`,
    ].filter(Boolean).join(' ');
}

type CustomButtonProps = {
    wrap?: boolean | undefined;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & CustomButtonProps;

export function Button(props: ButtonProps) {

    const allProps = useMemo(() => {
        return {
            ...props,
            className: getButtonClassName(props),
        };
    }, [props]);

    return (
        <button {...allProps} />
    );
}

type ButtonLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement> & CustomButtonProps;

export function ButtonLink(props: ButtonLinkProps) {

    const allProps = useMemo(() => {
        return {
            ...props,
            className: getButtonClassName(props),
        };
    }, [props]);

    return (
        <Link {...allProps} />
    );
}