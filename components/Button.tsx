import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/routing";
import type { AppPathname } from "@/i18n/routing";

type Variant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-button-bg text-button-text hover:bg-text-secondary disabled:hover:bg-button-bg",
  secondary:
    "border border-text-primary/80 text-text-primary hover:bg-text-primary hover:text-button-text",
  ghost:
    "text-text-secondary hover:text-text-primary",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    as?: "button";
  };

type ButtonAsAnchor = CommonProps &
  Omit<ComponentProps<"a">, "className" | "children" | "href"> & {
    as: "a";
    href: string;
  };

type ButtonAsLink = CommonProps & {
  as: "link";
  href: AppPathname;
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "", icon } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </>
  );

  if (props.as === "link") {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }
  if (props.as === "a") {
    const { as: _as, href, variant: _v, children: _c, className: _cn, icon: _i, ...rest } = props;
    void _as; void _v; void _c; void _cn; void _i;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  const { as: _as, variant: _v, children: _c, className: _cn, icon: _i, ...rest } = props;
  void _as; void _v; void _c; void _cn; void _i;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
