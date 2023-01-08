import styles from './BeerContainer.module.css';
import BeerCard from './BeerCard';

const BeerContainer = ({ beerData }) => {
  return (
    <div className={styles.beer_container}>
      {beerData.map((beer) => {
        return <BeerCard key={beer._id} beerInfo={beer} />;
      })}
    </div>
  );
};

export default BeerContainer;
