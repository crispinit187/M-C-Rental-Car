import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GearIcon, HeartIcon, SeatIcon, StarIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { imageUrl, money } from '../lib/format.js';

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--text);
  background: var(--surface);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 10px 16px;
  transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.35s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: var(--text-faint);
  }
  &:hover .photo img { transform: scale(1.05); }

  .photo {
    position: relative;
    aspect-ratio: 4 / 3;
    border-radius: 12px;
    overflow: hidden;
    background: var(--surface-2);
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s var(--ease);
  }
  .body { padding: 0 6px; display: flex; flex-direction: column; gap: 6px; }
  h3 { font-size: 15px; font-weight: 600; line-height: 1.3; }
  .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 12px; font-size: 12.5px; color: var(--text-soft); }
  .meta .item { display: inline-flex; align-items: center; gap: 4px; }
  .rating { color: var(--text); font-weight: 600; }
  .rating svg { color: var(--star); }
  .price { display: flex; align-items: baseline; gap: 6px; margin-top: 2px; flex-wrap: wrap; }
  .tag { font-size: 12px; color: var(--text-soft); }
  .amount { font-size: 17px; font-weight: 700; }
  .unit { font-size: 12.5px; color: var(--text-soft); }
`;

const Heart = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 0;
  display: grid;
  place-items: center;
  background: rgba(20, 24, 29, 0.55);
  backdrop-filter: blur(6px);
  color: ${(p) => (p.$on ? '#ff6b6b' : '#ffffff')};

  &:hover { background: rgba(20, 24, 29, 0.78); transform: scale(1.08); }
  svg { transition: transform 0.3s var(--ease); transform: ${(p) => (p.$on ? 'scale(1.15)' : 'scale(1)')}; }
`;

export default function CarCard({ car, detailed = false, ...rest }) {
  const { saved, toggleSaved } = useApp();
  const on = saved.includes(car.id);
  return (
    <Card to={`/vehicle-listings/${car.id}`} {...rest}>
      <div className="photo">
        <img src={imageUrl(car.images[0])} alt={`${car.year} ${car.name}`} loading="lazy" />
        <Heart
          type="button"
          $on={on}
          aria-pressed={on}
          aria-label={on ? 'Remove from favourites' : 'Save to favourites'}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaved(car.id);
          }}
        >
          <HeartIcon filled={on} size={18} />
        </Heart>
      </div>
      <div className="body">
        <h3>{car.name}</h3>
        <div className="meta">
          <span>{car.year}</span>
          {car.rating && (
            <span className="item rating">
              <StarIcon size={14} /> {car.rating.toFixed(1)}
              <span style={{ color: 'var(--text-soft)', fontWeight: 400 }}>({car.reviews.length}{detailed ? ` review${car.reviews.length > 1 ? 's' : ''}` : ''})</span>
            </span>
          )}
          {detailed && (
            <>
              <span className="item"><SeatIcon size={14} /> {car.seats} Passengers</span>
              <span className="item"><GearIcon size={14} /> {car.trans.toUpperCase()}</span>
            </>
          )}
          <span>{car.area}</span>
        </div>
        <div className="price">
          <span className="tag">{car.cardTag}</span>
          <span className="amount">{money(car.listPrice)}</span>
          <span className="unit">/ {car.priceUnit === 'day' ? 'day' : 'first 3 hours'}</span>
        </div>
      </div>
    </Card>
  );
}
