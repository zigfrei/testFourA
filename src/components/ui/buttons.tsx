import clsx from 'clsx';

type ButtonProps = React.PropsWithChildren<
    React.ButtonHTMLAttributes<HTMLButtonElement>
>;

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center bg-primary cursor-pointer rounded-20 px-[60px] py-4 min-[375px]:py-5 text-black font-bold text-lg md:text-xl leading-[130%]',
        className,
      )}
    >
      {children}
    </button>
  );
}