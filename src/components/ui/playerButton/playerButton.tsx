import styles from './playerButton.module.css';

interface PlayerButtonProps {
  type: ButtonType;
}

export enum ButtonType {
  Dealer = 'dealer',
  SmallBlind = 'smallBlind',
  BigBlind = 'bigBlind',
  AllIn = 'allIn',
}

const PlayerButton = ({ type }: PlayerButtonProps) => {
  return (
    <>
      {type === ButtonType.Dealer && (
        <div title='Dealer' className={`${styles.dealer} ${styles.button}`}>
          D
        </div>
      )}
      {type === ButtonType.SmallBlind && (
        <div
          title='Small Blind'
          className={`${styles.smallBlind} ${styles.button}`}
        >
          SB
        </div>
      )}
      {type === ButtonType.BigBlind && (
        <div
          title='Big Blind'
          className={`${styles.bigBlind} ${styles.button}`}
        >
          BB
        </div>
      )}
      {type === ButtonType.AllIn && (
        <div title='All In' className={`${styles.allIn} ${styles.button}`}>
          AI
        </div>
      )}
    </>
  );
};

export default PlayerButton;
