import styled from 'styled-components';
import { Page } from '../components/ui.js';
import SearchPill from '../components/SearchPill.jsx';
import Promo from '../components/Promo.jsx';
import CarRow from '../components/CarRow.jsx';
import { CategoryChips, EarnSection, Press, Testimonials } from '../components/HomeSections.jsx';
import { CITIES, carsInCity, carsWithTag } from '../data/cars.js';
import { useApp } from '../context/AppContext.jsx';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 44px);
`;

const TAG_ROWS = [
  { tag: 'Chauffeur', id: 'tag-chauffeur', title: 'Chauffeur-driven', subtitle: 'Sit back, we drive.' },
  { tag: 'SUV', id: 'tag-suv', title: 'SUVs', subtitle: 'Spacious and family-friendly.' },
  { tag: 'Sport', id: 'tag-sport', title: 'Sport', subtitle: 'Performance meets power.' },
  { tag: 'Economy', id: 'tag-economy', title: 'Economy', subtitle: 'Great on fuel, easy on pocket.' },
  { tag: 'Monthly', id: 'tag-monthly', title: 'Monthly rentals', subtitle: 'Best for long-term needs.' },
  { tag: 'Event', id: 'tag-event', title: 'For your event', subtitle: 'Weddings, parties and more.' },
];

export default function Home() {
  const { openSignIn } = useApp();
  return (
    <Page>
      <Stack>
        <SearchPill />
        <Promo />
        <CategoryChips />

        {CITIES.map((city) => (
          <CarRow
            key={city}
            id={`city-${city.toLowerCase()}`}
            title={city}
            cars={carsInCity(city)}
            to={`/vehicle-listings?city=${encodeURIComponent(city)}`}
            allLabel={city}
          />
        ))}

        {TAG_ROWS.map((r) => (
          <CarRow
            key={r.tag}
            id={r.id}
            title={r.title}
            subtitle={r.subtitle}
            cars={carsWithTag(r.tag)}
            to={`/vehicle-listings?tag=${r.tag}`}
            allLabel={r.title}
          />
        ))}

        <EarnSection onList={() => openSignIn('Sign in to list your car.')} />
        <Testimonials />
        <Press />
      </Stack>
    </Page>
  );
}
