import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";

type Variant = "primary" | "secondary" | "ghost";

const baseClasses =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-tight transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-button-bg text-button-text hover:bg-white disabled:hover:bg-button-bg",
  secondary:
    "border border-border-strong text-text-primary hover:border-text-primary hover:bg-text-primary hover:text-button-text",
  ghost: "px-0 text-text-secondary hover:text-text-primary",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  /** "internal" draws →, "external" draws ↗. */
  arrow?: "internal" | "external";
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
  href: ComponentProps<typeof Link>["href"];
};

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", children, className = "", arrow } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  const ArrowIcon = arrow === "external" ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowIcon
          size={16}
          aria-hidden="true"
          className={`transition-transform duration-200 ${
            arrow === "external"
              ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              : "group-hover:translate-x-0.5"
          }`}
        />
      ) : null}
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
    const { as: _as, href, variant: _v, children: _c, className: _cn, arrow: _a, ...rest } = props;
    void _as; void _v; void _c; void _cn; void _a;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  const { as: _as, variant: _v, children: _c, className: _cn, arrow: _a, ...rest } = props;
  void _as; void _v; void _c; void _cn; void _a;
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
