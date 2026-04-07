'use client';

import { useEffect, useMemo, useState } from 'react';
import Star from '@/app/icons/star.svg';
import { useAppDispatch } from '@/store/hooks';
import { setDiscountExpired } from '@/store/slices/tariffsUiSlice';

const INITIAL_SECONDS = 2 * 60 ; // 2:00
const DANGER_THRESHOLD = 30; // последние 30 секунд

export default function Header() {
  const dispatch = useAppDispatch();
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);

  useEffect(() => {
    dispatch(setDiscountExpired(false));
  }, [dispatch]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      dispatch(setDiscountExpired(true));
    }
  }, [dispatch, secondsLeft]);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  }, [secondsLeft]);

  const isDanger = secondsLeft > 0 && secondsLeft <= DANGER_THRESHOLD;
  const isFinished = secondsLeft === 0;
  const timerColorClass = isFinished
    ? 'text-white'
    : isDanger
      ? 'text-danger-red animate-blink'
      : 'text-primary';

  return (
    <header className='sticky top-0 z-50 w-full flex flex-col items-center justify-center py-2 gap-1 bg-header-green'>
      <p className='font-semibold text-sm min-[375px]:text-lg md:text-2xl leading-[130%] text-center'>
        Успейте открыть пробную неделю
      </p>

      <div className='flex items-center gap-2'>
        <Star className={timerColorClass} />
        <p
          className={`[font-family:var(--font-raleway)] font-bold text-[28px] md:text-[40px] min-[375px]:text-[32px] leading-[110%] ${timerColorClass}`}
        >
          {formattedTime}
        </p>
        <Star className={timerColorClass} />
      </div>
    </header>
  );
}