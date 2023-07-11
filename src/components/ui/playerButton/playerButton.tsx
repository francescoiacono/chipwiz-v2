import styles from './playerButton.module.css';

interface PlayerButtonProps {
  type: ButtonType;
}

export enum ButtonType {
  Dealer = 'dealer',
  SmallBlind = 'smallBlind',
  BigBlind = 'bigBlind',
}

const PlayerButton = ({ type }: PlayerButtonProps) => {
  return (
    <>
      {type === ButtonType.Dealer && (
        <div className={`${styles.dealer} ${styles.button}`}>D</div>
      )}
      {type === ButtonType.SmallBlind && (
        <div className={`${styles.smallBlind} ${styles.button}`}>SB</div>
      )}
      {type === ButtonType.BigBlind && (
        <div className={`${styles.bigBlind} ${styles.button}`}>BB</div>
      )}
    </>
  );
};

export default PlayerButton;
