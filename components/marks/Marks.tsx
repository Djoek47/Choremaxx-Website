import Icon, { type IconName } from '@/lib/Icon';

type MarkProps = { size?: number };

function wrap(name: IconName) {
  return function Mark({ size = 22 }: MarkProps) {
    return <Icon name={name} size={size} />;
  };
}

export const MarkClipboard = wrap('kitchen');
export const MarkScales = wrap('laundry');
export const MarkClock = wrap('dailyRoutine');
export const MarkBook = wrap('homework');
export const MarkCart = wrap('groceries');
export const MarkBolt = wrap('firstStep');
export const MarkFlame = wrap('weekWarrior');
export const MarkMoon = wrap('earlyBird');
export const MarkShield = wrap('tierShield');
export const MarkPause = wrap('bedroom');
export const MarkAppliance = wrap('maintenance');
export const MarkPeople = wrap('teamPlayer');
export const MarkFace = wrap('hygiene');
export const MarkPin = wrap('yard');
export const MarkHouse = wrap('livingRoom');
export const MarkLock = wrap('tierShield');
export const MarkCrown = wrap('tierCrown');
export const MarkMedal = wrap('tierMedal');
export const MarkChart = wrap('tierCup');
export const MarkPoppins = wrap('poppinsFavorite');

export function MarkTile({
  children,
  size = 42,
}: {
  children: React.ReactNode;
  tone?: 'rust' | 'colourless';
  size?: number;
}) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
        background: 'color-mix(in srgb, var(--tx) 8%, transparent)',
        color: 'var(--tx)',
      }}
    >
      {children}
    </span>
  );
}
