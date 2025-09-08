import type { FC } from "react";
import styles from './filterButton.module.css'

type FilterButtonProps = {
  title: string;
  selected: boolean;
  onClick: () => void;
  className: string;
  disabled: boolean
};

export const FilterButton: FC<FilterButtonProps> = ({
  title,
  selected,
  onClick,
  className,
  disabled
}) => {
  return <button disabled={disabled} onClick={onClick} className={`${selected ? styles.buttonSelected : ''} ${styles.button} ${className}`}>{title}</button>;
};
