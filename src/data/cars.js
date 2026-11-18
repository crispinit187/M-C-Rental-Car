/* ----------------------------------------------------------------------
   MOCK DATA - every car, host, review and price below is sample data.
   One photo per car (the 31 supplied photos, used exactly as given).
   Prices are in Zambian Kwacha (K).
   ---------------------------------------------------------------------- */

export const CITIES = ['Lusaka', 'Kitwe', 'Ndola', 'Livingstone'];

export const CATEGORIES = ['Economy', 'SUV', 'Sport', 'Monthly', 'Chauffeur', 'Event'];

/* Small deterministic generator so mock data is stable between reloads. */
const mulberry = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];

const HOSTS = [
  'Mwansa K.', 'Chanda M.', 'Bwalya S.', 'Natasha P.', 'Kondwani T.', 'Mutale C.',
  'Thandiwe B.', 'Lubinda N.', 'Chola M.', 'Mulenga R.', 'Namukolo S.', 'Joseph Z.',
  'Mapalo D.', 'Brian L.', 'Chileshe W.', 'Given H.',
];

const RENTERS = [
  'Kabwe M.', 'Taonga C.', 'Mpundu L.', 'Chisomo B.', 'Esther N.', 'Francis K.', 'Grace T.',
  'Henry S.', 'Ireen P.', 'Joel M.', 'Kelvin Z.', 'Loveness D.', 'Martin C.', 'Nelly W.',
  'Oliver B.', 'Patricia H.', 'Quincy R.', 'Rose M.', 'Stanley L.', 'Tabitha K.',
];

const MONTHS = ['August 2026', 'September 2026', 'October 2026', 'November 2026', 'July 2026', 'June 2026'];

const REVIEW_TEXT = [
  'The car was spotless and handed over exactly on time. Smooth from start to finish.',
  'Great communication from the owner. Everything was explained clearly at pickup.',
  'Drives beautifully. Booking and verification took only a few minutes.',
  'Better than the usual rental companies. I will be booking again for sure.',
  'Super clean, full tank on pickup, and the owner was flexible with the return time.',
  'Exactly as described in the listing. A proper weekend treat.',
  'Easy pickup, friendly owner, and the car turned heads everywhere we went.',
  'Used it for a family trip and it was comfortable and reliable the whole way.',
  'Quick responses and no surprises on the price. Highly recommended.',
  'Fast, simple and professional. The checklist at handover made it stress free.',
];

const ABOUT = {
  Sport: [
    'Quick, loud and a lot of fun. Perfect for a weekend away or a special occasion.',
    'Well looked after, regularly serviced and ready to drive. Smooth gearbox and plenty of power.',
  ],
  SUV: [
    'Roomy, comfortable and capable. Ideal for family trips, airport runs and longer journeys.',
    'Plenty of space for passengers and luggage, with a high seating position and a quiet cabin.',
  ],
  Chauffeur: [
    'Travel in comfort with a professional driver. Great for executive transfers and events.',
    'Spacious, quiet and polished. A professional driver takes care of the road while you relax.',
  ],
  Economy: [
    'Efficient, easy to park and cheap to run. A smart pick for daily use around town.',
    'Nippy and economical, with a comfortable ride for city driving or longer trips.',
  ],
  Event: [
    'Arrive in style. Popular for weddings, birthdays, photo shoots and special events.',
    'A real head turner. Kept immaculate and ready for your big day.',
  ],
  Monthly: [
    'Available on flexible monthly terms for long stays, projects or relocations.',
    'Reliable and well maintained. Choose a monthly rental for the best day-to-day rate.',
  ],
};

const FEATURES_BASE = ['Air Conditioning', 'Bluetooth', 'Cruise Control', 'Apple CarPlay', 'Android Auto', 'GPS Navigation System', 'Reverse Camera', 'Parking Sensors', 'Leather Seats', 'Wireless Charging', 'Heated Seats', 'Sunroof', 'USB Ports', 'Keyless Entry'];

/* [photo, make, model, year, tags, city, area, rentalOptions, price, priceUnit, trans, seats, doors, fuel] */
const BASE = [
  [1, 'Ford', 'Mustang GT 5.0 V8', 2021, ['Sport'], 'Lusaka', 'Kabulonga', ['Self drive'], 3200, 'day', 'Auto', 4, 2, 'Petrol'],
  [2, 'Mercedes-Benz', 'C63 AMG', 2019, ['Sport', 'Event'], 'Lusaka', 'Woodlands', ['Self drive'], 4500, 'day', 'Auto', 5, 4, 'Petrol'],
  [3, 'Ford', 'Mustang EcoBoost High Performance', 2020, ['Sport'], 'Lusaka', 'Roma', ['Self drive'], 2600, 'day', 'Auto', 4, 2, 'Petrol'],
  [4, 'Mercedes-Benz', 'C200 AMG Line', 2019, ['Event'], 'Lusaka', 'Rhodes Park', ['Self drive', 'Chauffeur'], 2100, 'day', 'Auto', 5, 4, 'Petrol'],
  [5, 'Mercedes-Benz', 'C63 S AMG', 2020, ['Sport'], 'Lusaka', 'Ibex Hill', ['Self drive'], 4800, 'day', 'Auto', 5, 4, 'Petrol'],
  [6, 'Mercedes-Benz', 'C63 S AMG', 2021, ['Sport', 'Event'], 'Lusaka', 'Northmead', ['Self drive', 'Chauffeur'], 4900, 'day', 'Auto', 5, 4, 'Petrol'],
  [7, 'Land Rover', 'Range Rover Sport SVR', 2019, ['SUV', 'Sport'], 'Lusaka', 'Kabulonga', ['Self drive'], 5500, 'day', 'Auto', 5, 4, 'Petrol'],
  [8, 'Mercedes-Benz', 'C63 S AMG Coupe', 2018, ['Sport', 'Event'], 'Kitwe', 'Riverside', ['Self drive'], 4300, 'day', 'Auto', 4, 2, 'Petrol'],
  [9, 'Land Rover', 'Range Rover Sport SV', 2024, ['SUV', 'Event'], 'Lusaka', 'Villa Elizabetha', ['Self drive', 'Chauffeur'], 7200, 'day', 'Auto', 5, 4, 'Petrol'],
  [10, 'Mercedes-Benz', 'V300d', 2022, ['Chauffeur', 'Event'], 'Lusaka', 'Woodlands', ['Chauffeur'], 1800, '3h', 'Auto', 7, 5, 'Diesel'],
  [11, 'Jeep', 'Grand Cherokee Overland', 2017, ['SUV', 'Monthly'], 'Ndola', 'Itawa', ['Self drive'], 2300, 'day', 'Auto', 5, 4, 'Diesel'],
  [12, 'Mercedes-Benz', 'V-Class Executive', 2024, ['Chauffeur', 'Event'], 'Lusaka', 'Rhodes Park', ['Chauffeur'], 2800, '3h', 'Auto', 7, 5, 'Diesel'],
  [13, 'Jeep', 'Grand Cherokee', 2016, ['SUV', 'Monthly'], 'Kitwe', 'Parklands', ['Self drive'], 2100, 'day', 'Auto', 5, 4, 'Petrol'],
  [14, 'Toyota', 'Hilux Legend 2.8 GD-6', 2019, ['Economy', 'Monthly'], 'Livingstone', 'Maramba', ['Self drive'], 1600, 'day', 'Auto', 5, 4, 'Diesel'],
  [15, 'Porsche', 'Cayenne S', 2014, ['SUV'], 'Livingstone', 'Dambwa', ['Self drive'], 3600, 'day', 'Auto', 5, 4, 'Petrol'],
  [16, 'Mercedes-Benz', 'C63 AMG', 2017, ['Sport'], 'Ndola', 'Kansenshi', ['Self drive'], 3900, 'day', 'Auto', 5, 4, 'Petrol'],
  [17, 'Porsche', '911 Carrera 4S', 2022, ['Sport', 'Event'], 'Lusaka', 'Ibex Hill', ['Self drive', 'Chauffeur'], 9500, 'day', 'Auto', 4, 2, 'Petrol'],
  [18, 'Volkswagen', 'Golf 8 GTI', 2022, ['Sport', 'Economy', 'Monthly'], 'Lusaka', 'Kabulonga', ['Self drive'], 1900, 'day', 'Auto', 5, 4, 'Petrol'],
  [19, 'Porsche', 'Cayenne Coupe', 2021, ['SUV'], 'Lusaka', 'Roma', ['Self drive'], 5600, 'day', 'Auto', 5, 4, 'Petrol'],
  [20, 'Volkswagen', 'Golf 7 GTI', 2017, ['Economy', 'Monthly'], 'Lusaka', 'Chelston', ['Self drive'], 1300, 'day', 'Manual', 5, 4, 'Petrol'],
  [21, 'Mercedes-Benz', 'G500', 2019, ['SUV', 'Event'], 'Lusaka', 'Kabulonga', ['Self drive', 'Chauffeur'], 8200, 'day', 'Auto', 5, 4, 'Petrol'],
  [22, 'Volkswagen', 'Golf 7 GTI', 2018, ['Economy', 'Monthly'], 'Ndola', 'Northrise', ['Self drive'], 1200, 'day', 'Manual', 5, 4, 'Petrol'],
  [23, 'Mercedes-Benz', 'G63 AMG', 2020, ['SUV', 'Event'], 'Lusaka', 'Woodlands', ['Self drive', 'Chauffeur'], 9800, 'day', 'Auto', 5, 4, 'Petrol'],
  [24, 'Mercedes-Benz', 'G63 AMG', 2022, ['SUV', 'Event'], 'Lusaka', 'Rhodes Park', ['Self drive', 'Chauffeur'], 10500, 'day', 'Auto', 5, 4, 'Petrol'],
  [25, 'Mercedes-Benz', 'G63 AMG', 2023, ['SUV', 'Event'], 'Livingstone', 'Town Centre', ['Self drive', 'Chauffeur'], 10200, 'day', 'Auto', 5, 4, 'Petrol'],
  [26, 'Mercedes-Benz', 'Brabus G800', 2021, ['SUV', 'Event', 'Sport'], 'Lusaka', 'Ibex Hill', ['Chauffeur'], 6500, '3h', 'Auto', 4, 4, 'Petrol'],
  [27, 'BMW', 'M4 Competition', 2017, ['Sport'], 'Kitwe', 'Nkana East', ['Self drive'], 4000, 'day', 'Auto', 4, 2, 'Petrol'],
  [28, 'Mercedes-Benz', 'G63 AMG', 2021, ['SUV', 'Event'], 'Ndola', 'Kansenshi', ['Self drive', 'Chauffeur'], 9500, 'day', 'Auto', 5, 4, 'Petrol'],
  [29, 'BMW', 'M4 F82', 2018, ['Sport'], 'Lusaka', 'Northmead', ['Self drive'], 4200, 'day', 'Auto', 4, 2, 'Petrol'],
  [30, 'BMW', 'M3 F80', 2016, ['Sport'], 'Kitwe', 'Riverside', ['Self drive'], 3800, 'day', 'Auto', 5, 4, 'Petrol'],
  [31, 'BMW', 'M4 Competition G82', 2023, ['Sport', 'Monthly'], 'Lusaka', 'Ibex Hill', ['Self drive'], 6800, 'day', 'Auto', 4, 2, 'Petrol'],
];

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const buildCar = (row, index) => {
  const [photo, make, model, year, tags, city, area, options, price, priceUnit, trans, seats, doors, fuel] = row;
  const rand = mulberry(photo * 9973 + 17);
  const name = `${make} ${model}`;
  const reviewCount = Math.floor(rand() * 5); // 0..4
  const reviews = Array.from({ length: reviewCount }, () => ({
    name: pick(rand, RENTERS),
    date: pick(rand, MONTHS),
    stars: rand() > 0.2 ? 5 : 4,
    text: pick(rand, REVIEW_TEXT),
  }));
  const rating = reviews.length
    ? Math.round((reviews.reduce((a, r) => a + r.stars, 0) / reviews.length) * 10) / 10
    : null;

  const primary = tags.find((t) => ABOUT[t]) || 'Sport';
  const featureCount = 7 + Math.floor(rand() * 5);
  const features = [...FEATURES_BASE]
    .sort(() => rand() - 0.5)
    .slice(0, featureCount);

  const hasChauffeur = options.includes('Chauffeur');
  const hasSelf = options.includes('Self drive');
  // chauffeur rate for cars that offer both: roughly 40% of the day rate for the first 3 hours
  const chauffeurPrice = priceUnit === '3h' ? price : hasChauffeur ? Math.round((price * 0.45) / 50) * 50 : null;
  const dayPrice = priceUnit === 'day' ? price : null;

  return {
    id: `${year}-${slugify(name)}-${photo}`,
    index,
    name,
    make,
    model,
    year,
    tags: [...tags, ...(hasChauffeur && !tags.includes('Chauffeur') ? ['Chauffeur'] : [])],
    city,
    area,
    address: `${area}, ${city}, Zambia`,
    options,
    hasSelf,
    hasChauffeur,
    dayPrice,
    chauffeurPrice,
    extraHour: chauffeurPrice ? Math.round((chauffeurPrice * 0.28) / 50) * 50 : null,
    listPrice: priceUnit === '3h' ? chauffeurPrice : dayPrice,
    priceUnit,
    // card label: "Self drive" when it only offers self drive at a fixed price, "From" otherwise
    cardTag: options.length === 1 ? options[0] : 'From',
    trans,
    seats,
    doors,
    fuel,
    images: [`car-${String(photo).padStart(2, '0')}.jpeg`],
    host: { name: pick(rand, HOSTS), since: `${2 + Math.floor(rand() * 22)} months on M&C Rental Cars` },
    about: `${year} ${name}. ${pick(rand, ABOUT[primary])} ${
      priceUnit === '3h' ? 'Comes with a professional driver.' : 'Collect from the owner or ask about delivery.'
    }`,
    features,
    kmAllowed: priceUnit === '3h' ? 'Unlimited within the city' : [150, 200, 250, 300][Math.floor(rand() * 4)],
    extraKm: [8, 10, 12, 15][Math.floor(rand() * 4)],
    reviews,
    rating,
  };
};

export const CARS = BASE.map(buildCar);

export const getCar = (id) => CARS.find((c) => c.id === id);

export const MAKES = [...new Set(CARS.map((c) => c.make))].sort();

export const carsInCity = (city) => CARS.filter((c) => c.city === city);
export const carsWithTag = (tag) => CARS.filter((c) => c.tags.includes(tag));

/* ---------------- Home page: testimonials and press (sample content) ---------------- */

export const TESTIMONIALS = [
  { name: 'Mwila C.', city: 'Lusaka', stars: 5, text: 'The car arrived on time and in excellent, clean condition.', carIndex: 31 },
  { name: 'Tendai M.', city: 'Kitwe', stars: 5, text: 'The M3 was incredible. I am definitely coming back for round two.', carIndex: 30 },
  { name: 'Chipo B.', city: 'Ndola', stars: 5, text: 'I rented my dream car and the whole process was smooth from the first message.', carIndex: 16 },
  { name: 'Joseph L.', city: 'Lusaka', stars: 5, text: 'Rented straight from the owner in just a few minutes. No queues, no paperwork pile.', carIndex: 17 },
  { name: 'Natasha K.', city: 'Livingstone', stars: 5, text: 'We used the G-Wagon for our wedding day and it was perfect.', carIndex: 25 },
  { name: 'Brian S.', city: 'Lusaka', stars: 4, text: 'Great service from start to finish. Everything was explained clearly.', carIndex: 6 },
  { name: 'Mapalo D.', city: 'Lusaka', stars: 5, text: 'Very quick response and the vetting was fast and easy. Highly professional.', carIndex: 12 },
  { name: 'Given H.', city: 'Kitwe', stars: 5, text: '10/10. The owner was super friendly and made the whole process easy.', carIndex: 27 },
  { name: 'Esther N.', city: 'Lusaka', stars: 5, text: 'We needed a van for a family trip and the V-Class with a driver was spot on.', carIndex: 10 },
  { name: 'Francis T.', city: 'Ndola', stars: 5, text: 'Flexible pickup and drop-off. The owner worked around our schedule.', carIndex: 28 },
  { name: 'Loveness M.', city: 'Lusaka', stars: 5, text: 'Good pricing and a very easy booking. I have now used it three times.', carIndex: 18 },
  { name: 'Kelvin Z.', city: 'Lusaka', stars: 5, text: 'Rented a Porsche for the weekend and was pleasantly surprised by the price.', carIndex: 17 },
];

export const PRESS = [
  { outlet: 'Sample Business Weekly', headline: 'Sample headline: how car owners are earning from idle vehicles', cta: 'Read article' },
  { outlet: 'Sample TV Africa', headline: 'Sample feature: the benefits of renting directly from owners', cta: 'Watch feature' },
  { outlet: 'Sample Money Review', headline: 'Sample story: private vehicles and on-demand insurance take on traditional rental', cta: 'Read article' },
  { outlet: 'Sample Tech Daily', headline: 'Sample article: car rental platform lets owners earn cash', cta: 'Read article' },
  { outlet: 'Sample FM Drive', headline: 'Sample interview: variety, affordability and proximity', cta: 'Listen now' },
  { outlet: 'Sample Business Radio', headline: 'Sample podcast: the sharing economy and luxury cars', cta: 'Listen now' },
  { outlet: 'Sample City Press', headline: 'Sample opinion: is renting out your vehicle a good way to make money?', cta: 'Read article' },
];
