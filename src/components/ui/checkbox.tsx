import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useId } from 'react';

type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: React.ReactNode;
  children?: React.ReactNode;
  labelClassName?: string;
};

export default function Checkbox({
  label,
  children,
  className,
  labelClassName,
  id,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  const content = children ?? label;
 
  return (
    <label htmlFor={checkboxId} className={clsx('group flex items-center gap-2 cursor-pointer', className)}>
      <input
        id={checkboxId}
        type='checkbox'
        className='peer sr-only'
        {...rest}
      />

      <span className='w-[30px] md:w-[32px] h-[30px] md:h-[32px] shrink-0 border-[2px] rounded-[2px] border-black-200 flex items-center justify-center peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-base-black transition-colors'>
        <CheckIcon className='w-[30px] md:w-[32px] h-[30px] md:h-[32px] text-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity' />
      </span>

      {content ? (
        <span className={clsx('font-normal text-xs md:text-sm leading-[130%] md:leading-[110%] text-black-300 max-w-[600px]', labelClassName)}>
          {content}
        </span>
      ) : null}
    </label>
  );
}
