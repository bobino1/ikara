import { Link } from "@/i18n/navigation";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "outline" | "navy" | "ghost-light" | "card";

const variantClass: Record<Variant, string> = {
  primary: "btn--primary",
  outline: "btn--outline",
  navy: "btn--navy",
  "ghost-light": "btn--ghost-light",
  card: "btn--card",
};

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type AsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export function Button(props: AsButton | AsLink) {
  const { variant = "primary", children, style, className = "" } = props;
  const cls = `btn ${variantClass[variant]} ${className}`.trim();

  if ("href" in props && props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls} style={style}>
        {children}
      </Link>
    );
  }

  const { variant: _v, children: _c, style: _s, className: _cl, href: _h, ...rest } =
    props as AsButton;
  return (
    <button className={cls} style={style} {...rest}>
      {children}
    </button>
  );
}
