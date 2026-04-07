'use client';

import Image from 'next/image';
import Alert from '@/app/icons/alert.svg';
import { Button } from '../ui/buttons';
import Checkbox from '../ui/checkbox';
import Link from 'next/link';
import Card from '@/components/ui/card';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSelectedTariffId } from '@/store/slices/tariffsUiSlice';

export type Tariff = {
  id: string | number;
  period: string;
  price: string | number;
  full_price: string | number;
  is_best?: boolean;
  text: string;
};

type TarifsClientProps = {
  tariffs: Tariff[];
};

const toTariffId = (value: string | number) => String(value);

export default function TarifsClient({ tariffs }: TarifsClientProps) {
  const dispatch = useAppDispatch();
  const selectedTariffId = useAppSelector((state) => state.tariffsUi.selectedTariffId);
  const discountExpired = useAppSelector((state) => state.tariffsUi.discountExpired);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [isAgreementError, setIsAgreementError] = useState(false);

  const handleBuyClick = () => {
    if (!isAgreementChecked) {
      setIsAgreementError(true);
      return;
    }
  };

  useEffect(() => {
    if (!tariffs.length) return; 

    const selectedExists =
      selectedTariffId !== null &&
      tariffs.some((tariff) => toTariffId(tariff.id) === selectedTariffId);

    if (selectedExists) return;

    // const defaultTariff = tariffs.find((tariff) => tariff.is_best) ?? tariffs[0];
    // dispatch(setSelectedTariffId(toTariffId(defaultTariff.id)));
  }, [dispatch, selectedTariffId, tariffs]);

  return (
    <div className='w-full max-w-[1216px] min-h-screen flex flex-col items-start justify-center p-4'>
      <h1 className='font-bold text-[22px] min-[375px]:text-2xl md:text-[40px] leading-[110%] tracking-[0.01em] py-[24px] md:pt-[50px]  md:pb-[110px]'>
        Выбери подходящий для себя <span className='text-primary'>тариф</span>
      </h1>
      <div className='w-full flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='flex items-center justify-center relative'>
          <Image
            src='/man.png'
            alt='Trainer illustration'
            width={380}
            height={767}
            className='w-full h-[200px] min-[375px]:h-[250px] md:h-auto max-w-[380px] object-contain'
          />
          <div className='bg-gradient-to-b from-[rgba(35,40,41,0)] to-[#232829] absolute bottom-0 left-0 w-full h-[80px]'></div>
        </div>
        <div className='w-full max-w-[768px] flex flex-col items-start justify-center'>
          <div className='w-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-[auto_auto] gap-2'>
            {tariffs.map((tariff) => {
              const tariffId = toTariffId(tariff.id);
              const effectivePrice = discountExpired ? tariff.full_price : tariff.price;

              return (
                <Card
                  key={tariff.id}
                  period={tariff.period}
                  price={effectivePrice}
                  full_price={tariff.full_price}
                  text={tariff.text}
                  is_best={tariff.is_best}
                  selected={selectedTariffId === tariffId}
                  onClick={() => dispatch(setSelectedTariffId(tariffId))}
                  className={clsx(tariff.is_best && 'md:col-span-3')}
                />
              );
            })}
            {tariffs.length === 0 && (
              <p className='text-base text-danger-red'>Не удалось загрузить тарифы.</p>
            )}
          </div>

          <div className='w-full max-w-[500px] flex items-start justify-start gap-[6px] md:gap-[8px] py-[14px] pr-5 pl-3 md:py-[18px] md:px-5 rounded-16 min-[375px]:rounded-20 bg-black-100 mt-[10px] min-[375px]:mt-[12px] md:mt-[20px]'>
            <Alert className='w-[24px] h-[26px] shrink-0' />
            <p>
              Следуя плану на 3 месяца и более, люди получают в 2 раза лучший
              результат, чем за 1 месяц
            </p>
          </div>
          <div>
            <Checkbox
              className='mt-[16px] min-[375px]:mt-[20px] md:mt-[16px]'
              checked={isAgreementChecked}
              onChange={(event) => {
                setIsAgreementChecked(event.target.checked);
                setIsAgreementError(false);
              }}
            >
              Я согласен с{' '}
              <Link href='/#' className='text-black-300 underline'>
                офертой рекуррентных платежей
              </Link>{' '}
              и{' '}
              <Link href='/#' className='text-black-300 underline'>
                Политикой конфиденциальности
              </Link>
            </Checkbox>
            <div
              aria-hidden={!isAgreementError}
              className={clsx(
                'grid transition-all duration-300 ease-out',
                isAgreementError ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 mt-0'
              )}
            >
              <p className='overflow-hidden text-danger-red font-normal text-xs md:text-sm leading-[130%] md:leading-[110%]'>
                Для приобретения необходимо согласие с условиями.
              </p>
            </div>
          </div>
          <Button
            onClick={handleBuyClick}
            className='w-full max-w-[380px] justify-center mt-[16px] min-[375px]:mt-[20px] md:mt-[16px] animate-blink'
          >
            Купить
          </Button>
          <p className='w-full font-normal text-[10px] md:text-sm leading-[120%] text-gray-dark mt-[10px] min-[375px]:mt-[20px] md:mt-[14px]'>
            Нажимая кнопку «Купить», Пользователь соглашается на разовое
            списание денежных средств для получения пожизненного доступа к
            приложению. Пользователь соглашается, что данные кредитной/дебетовой
            карты будут сохранены для осуществления покупок дополнительных услуг
            сервиса в случае желания пользователя.
          </p>
        </div>
      </div>
      <div className='w-full flex flex-col items-start justify-center p-3 md:p-5 rounded-20 md:rounded-30 border border-gray gap-[10px] md:gap-[30px] mt-[22px] min-[375px]:mt-[24px] md:mt-[66px]'>
        <h3 className='text-accent-green font-medium text-base min-[375px]:text-lg md:text-[28px] leading-[120%] border border-accent-green rounded-30 pt-[10px] px-[18px] pb-[12px] md:pt-4 md:px-[30px] md:pb-[18px]'>
          гарантия возврата 30 дней
        </h3>
        <p className='font-normal text-[13px] min-[375px]:text-sm md:text-2xl leading-[130%] text-gray-light'>
          Мы уверены, что наш план сработает для тебя и ты увидишь видимые
          результаты уже через 4 недели! Мы даже готовы полностью вернуть твои
          деньги в течение 30 дней с момента покупки, если ты не получишь
          видимых результатов.
        </p>
      </div>
    </div>
  );
}