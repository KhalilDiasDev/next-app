interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
  bold?: boolean;
}

export default function Title({
  children,
  className,
  bold,
  ...props
}: TitleProps) {
  return (
    <h5
      className={`text-lg md:text-xl xl:text-2xl ${className}`}
      {...props}
      style={{ fontWeight: bold ? "bold" : "normal" }}
    >
      {children}
    </h5>
  );
}
