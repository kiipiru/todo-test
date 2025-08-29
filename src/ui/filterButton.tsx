import type { FC } from "react";
import styles from './filterButton.module.css'

type FilterButtonProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  className: string
};

export const FilterButton: FC<FilterButtonProps> = ({
  title,
  selected,
  onClick,
  className
}) => {
  return <button onClick={onClick} className={`${selected ? styles.buttonSelected : ''} ${styles.button} ${className}`}>{title}</button>;
};
