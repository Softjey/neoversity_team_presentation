import type { CSSProperties, ElementType, ReactElement, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: ReactNode;
  /** Індекс для каскадної затримки */
  index?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}

/** Обгортка, що вмикає .reveal-анімацію, коли елемент з’являється у вʼюпорті. */
export function Reveal({ children, index = 0, as: Tag = 'div', className = '', style }: RevealProps): ReactElement {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-in={inView}
      className={`reveal ${className}`.trim()}
      style={{ '--i': index, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
