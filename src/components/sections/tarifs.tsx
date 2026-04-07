import TarifsClient, { type Tariff } from './tarifs-client';

const TARIFFS_URL = 'https://t-core.fit-hub.pro/Test/GetTariffs';

export default async function Tarifs() {
  let tariffs: Tariff[] = [];

  try {
    const response = await fetch(TARIFFS_URL, {
      cache: 'no-store',
    });

    if (response.ok) {
      const rawTariffs = (await response.json()) as unknown;

      if (Array.isArray(rawTariffs)) {
        const seenIds = new Map<string, number>();

        tariffs = [...rawTariffs]
          .filter((item): item is Tariff => {
            if (!item || typeof item !== 'object') return false;

            const candidate = item as Partial<Tariff>;

            return (
              candidate.id !== undefined &&
              candidate.period !== undefined &&
              candidate.price !== undefined &&
              candidate.full_price !== undefined &&
              candidate.text !== undefined
            );
          })
          .sort(
            (a, b) => Number(Boolean(b?.is_best)) - Number(Boolean(a?.is_best))
          )
          .map((item) => {
            const baseId = String(item.id);
            const count = seenIds.get(baseId) ?? 0;
            seenIds.set(baseId, count + 1);

            if (count === 0) return item;

            return {
              ...item,
              id: `${baseId}__${count + 1}` as Tariff['id'],
            };
          });
      }
    }
  } catch {
    tariffs = [];
  }

  return <TarifsClient tariffs={tariffs} />;
}