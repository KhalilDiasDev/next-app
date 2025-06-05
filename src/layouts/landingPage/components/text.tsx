interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "medium";
}

const sizes = {
  small: "text-sm md:text-md",
  medium: "text-md xl:text-lg",
};

export default function Text({
  children,
  className,
  size = "medium",
  ...props
}: TextProps) {
  return (
    <p className={`${sizes[size]} ${className}`} {...props}>
      {children}
    </p>
  );
}
