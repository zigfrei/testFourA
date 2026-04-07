import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store/hooks';

type CardProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    period: string; // период тарифа
    price: string | number; // цена со скидкой
    full_price: string | number; // цена без скидки
    is_best?: boolean; // выбран по дефолту / лучший тариф
    selected?: boolean; // выбранная карточка
    text: string; // текст тарифа
  }
>;

export default function Card({
  children,
  className,
  period,
  price,
  full_price,
  is_best = false,
  selected = false,
  text,
  ...rest
}: CardProps) {
  const showExplosion = useAppSelector((state) => state.tariffsUi.discountExpired);
  const priceNum = Number(price);
  const fullPriceNum = Number(full_price);

  const rawPercent =
    fullPriceNum > 0 ? ((fullPriceNum - priceNum) / fullPriceNum) * 100 : 0;

  const percent = Math.round(rawPercent / 5) * 5;
  const showDiscountBadge = percent > 0;
  const showFullPrice = priceNum !== fullPriceNum;
  const [isExplosionVisible, setIsExplosionVisible] = useState(false);
  const hasPlayedExplosionRef = useRef(false);

  useEffect(() => {
    if (!showExplosion || hasPlayedExplosionRef.current) return;

    hasPlayedExplosionRef.current = true;

    const showTimeout = window.setTimeout(() => {
      setIsExplosionVisible(true);
    }, 0);

    const timeout = window.setTimeout(() => {
      setIsExplosionVisible(false);
    }, 1400);

    return () => {
      window.clearTimeout(showTimeout);
      window.clearTimeout(timeout);
    };
  }, [showExplosion]);

  return (
    <div
      {...rest}
      className={clsx(
        'w-full h-full flex flex-col bg-black-400 rounded-20 md:rounded-40 py-5 pl-5 pr-4 min-[375px]:pr-[30px] md:pt-[70px] md:px-[21px] md:pb-[26px] border-[2px] border-solid border-gray relative cursor-pointer transition-colors ',
        className,
        selected && 'border-accent-green! bg-black-600!',
        is_best &&
          'border-primary p-5 min-[375px]:py-[20px] min-[375px]:px-[30px] md:p-[30px]!',
      )}
    >
      <p
        aria-hidden={!showDiscountBadge}
        className={clsx(
          'absolute top-[-2px] right-[50px] md:right-auto md:left-[50px] py-[3px] px-[6px] md:py-[5px] md:px-[8px] [font-family:var(--font-gilroy)] bg-red rounded-t-none rounded-b-lg transition-all duration-300 ease-out',
          is_best &&
            'right-[50px] min-[375px]:right-[62px] md:right-auto md:left-[50px]',
          showDiscountBadge
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-1 pointer-events-none',
        )}
      >
        {percent}%
      </p>
      {is_best && (
        <span className='absolute top-[10px] right-[14px] md:right-[20px] text-primary font-medium text-[13px] min-[375px]:text-base md:text-[22px] leading-[130%] tracking-[0.03em]'>
          ХИТ!
        </span>
      )}

      <div
        className={clsx(
          'flex flex-row md:flex-col items-center md:items-start gap-[30px] md:gap-[40px]',
          is_best && 'md:flex-row items-center! justify-center relative',
        )}
      >
        <div className='w-full self-center flex flex-col items-start gap-3 min-[375px]:gap-4 md:gap-[30px]'>
          <span className='text-sm text-base-white font-medium text-base min-[375px]:text-lg md:text-[26px] leading-[120%]'>
            {period}
          </span>
          <div className='flex flex-col items-end'>
            
              <span className='font-semibold text-3xl min-[375px]:text-[34px] md:text-[50px] leading-none'>
                {price} ₽
              </span>
              <div
                aria-hidden={!isExplosionVisible}
                className={clsx(
                  'absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none transition-opacity duration-300 z-10 w-[140px] h-[140px] min-[375px]:w-[180px] min-[375px]:h-[180px] md:w-[260px] md:h-[260px]',
                  isExplosionVisible ? 'opacity-100' : 'opacity-0'
                )}
              >
                <Image
                  src='/explosion.gif'
                  alt=''
                  width={260}
                  height={260}
                  unoptimized
                  className='w-full h-full object-contain'
                />
              </div>
            
            <span
              aria-hidden={!showFullPrice}
              className={clsx(
                'line-through text-black-500 font-normal text-sm min-[375px]:text-base md:text-2xl leading-[120%] transition-all duration-300 ease-out overflow-hidden',
                showFullPrice
                  ? 'opacity-100 translate-y-0 max-h-10'
                  : 'opacity-0 -translate-y-1 max-h-0 pointer-events-none',
              )}
            >
              {full_price} ₽
            </span>
          </div>
        </div>
        <p className='w-full max-w-[328px] line-clamp-4 font-normal text-sm leading-[130%] md:text-base'>
          {text}
        </p>
      </div>
      {children}
    </div>
  );
}
