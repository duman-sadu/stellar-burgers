import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlayUIProps = {
  onClick: () => void;
};

export const ModalOverlayUI: FC<TModalOverlayUIProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick} />
);
