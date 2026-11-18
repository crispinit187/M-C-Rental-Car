import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Input, Page } from '../components/ui.js';
import DateRange from '../components/DateRange.jsx';
import Modal, { ModalClose, ModalBack } from '../components/Modal.jsx';
import BackLink from '../components/BackLink.jsx';
import Reveal from '../components/Reveal.jsx';
import { HeartIcon, ImagesIcon, MessageIcon, StarIcon, ChevronLeft, ChevronRight, CheckIcon } from '../components/Icons.jsx';
import { getCar } from '../data/cars.js';
import { useApp } from '../context/AppContext.jsx';
import { DAY_FACTORS, dailyRateFor, daysBetween, imageUrl, money } from '../lib/format.js';

const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: 28px;
  align-items: start;
  @media (max-width: 980px) { grid-template-columns: 1fr; }

  .main { display: flex; flex-direction: column; gap: 22px; min-width: 0; }
  .aside { position: sticky; top: 92px; @media (max-width: 980px) { position: static; } }
  .titlebar { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
  h1 { font-size: clamp(26px, 4vw, 38px); font-weight: 700; line-height: 1.15; }
  .loc { color: var(--text-soft); font-size: 14.5px; margin-top: 4px; }
  .crumbs { font-size: 13px; color: var(--text-soft); margin-bottom: 14px; }
  .crumbs a:hover { text-decoration: underline; text-underline-offset: 4px; }
`;

const Card = styled.section`
  padding: 22px;
  border-radius: 22px;
  background: var(--surface);
  backdrop-filter: blur(14px);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  h2 { font-size: 20px; font-weight: 600; margin-bottom: 14px; }
`;

const Hero = styled.div`
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  background: var(--surface-2);
  border: 1px solid var(--border);
  img { width: 100%; height: 100%; object-fit: cover; }
  .view {
    position: absolute; right: 14px; bottom: 14px;
    display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 0 16px;
    border-radius: 999px; border: 0; font-weight: 600; font-size: 13.5px;
    background: rgba(20, 24, 29, 0.72); color: #fff; backdrop-filter: blur(8px);
  }
  .view:hover { background: rgba(20, 24, 29, 0.9); }
`;

const HeartBtn = styled.button`
  flex: none; width: 46px; height: 46px; border-radius: 50%;
  border: 1px solid var(--border); background: var(--surface);
  display: grid; place-items: center;
  color: ${(p) => (p.$on ? '#ff6b6b' : 'var(--text)')};
  &:hover { background: var(--accent-soft); }
`;

const Tiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(104px, 1fr));
  gap: 10px;
  .tile { padding: 12px 14px; border-radius: 14px; background: var(--surface-2); display: flex; flex-direction: column; gap: 4px; }
  .tile span { font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-faint); }
  .tile b { font-size: 15px; }
  .tile b small { font-weight: 400; font-size: 11.5px; color: var(--text-soft); }
`;

const Booking = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 14px;
  .top { display: flex; justify-content: space-between; align-items: flex-end; gap: 10px; }
  .big { font-size: 30px; font-weight: 700; line-height: 1.1; }
  .unit { font-size: 14px; color: var(--text-soft); font-weight: 400; }
  .opt { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }
  .badge { align-self: flex-start; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 999px; background: var(--accent-soft); }
  .seg { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: 6px; padding: 5px; border-radius: 999px; background: var(--surface-2); border: 1px solid var(--border); }
  .seg button {
    border: 0; border-radius: 999px; padding: 8px 10px; background: transparent; display: flex; flex-direction: column; align-items: center; line-height: 1.2;
    font-weight: 600; font-size: 13.5px;
  }
  .seg button small { font-weight: 400; font-size: 11.5px; color: var(--text-soft); }
  .seg button[aria-pressed='true'] { background: var(--surface-solid); box-shadow: 0 2px 10px rgba(0,0,0,.18); }
  .sum { display: flex; flex-direction: column; gap: 8px; font-size: 14px; padding-top: 4px; }
  .sum div { display: flex; justify-content: space-between; gap: 10px; color: var(--text-soft); }
  .sum .total { color: var(--text); font-weight: 700; font-size: 16px; padding-top: 10px; border-top: 1px solid var(--border); }
  .error { color: var(--danger); font-size: 13px; }
  .small { font-size: 12.5px; color: var(--text-faint); text-align: center; }
  select { width: 100%; }
  .offer { display: grid; grid-template-rows: ${(p) => (p.$offerOpen ? '1fr' : '0fr')}; transition: grid-template-rows 0.4s var(--ease); }
  .offer > div { overflow: hidden; min-height: 0; }
  .offer-inner { display: flex; flex-direction: column; gap: 10px; padding-top: 4px; }
`;

const Host = styled(Card)`
  display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
  .who { display: flex; align-items: center; gap: 14px; }
  .avatar { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; background: var(--accent); color: var(--accent-text); }
  .label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-faint); }
  .name { font-size: 18px; font-weight: 600; }
  .since { font-size: 13px; color: var(--text-soft); }
`;

const Specs = styled.div`
  display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;
  div { padding: 14px 16px; border-radius: 14px; border: 1px solid var(--border); background: var(--surface-2); }
  span { display: block; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-faint); }
  b { font-size: 16px; }
`;

const Features = styled.ul`
  display: flex; flex-wrap: wrap; gap: 10px;
  li { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; border-radius: 999px; background: var(--surface-2); font-size: 13.5px; }
  li svg { color: var(--focus); }
`;

const Reviews = styled(Card)`
  .score { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 700; }
  .score svg { color: var(--star); }
  .note { font-size: 13px; color: var(--text-soft); margin: 4px 0 16px; }
  .list { display: flex; flex-direction: column; gap: 16px; }
  .rev { display: flex; gap: 12px; }
  .rev .av { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-weight: 600; background: var(--surface-2); }
  .rev b { display: block; font-size: 14.5px; }
  .rev small { color: var(--text-soft); font-size: 12.5px; }
  .rev p { margin-top: 4px; font-size: 14.5px; line-height: 1.55; }
  .more { margin-top: 14px; background: none; border: 0; padding: 0; font-weight: 600; text-decoration: underline; text-underline-offset: 4px; }
`;

const Lightbox = styled.div`
  position: relative; background: #000;
  img { width: 100%; max-height: 80vh; object-fit: contain; }
  .close { position: absolute; top: 12px; right: 12px; }
  .back { position: absolute; top: 12px; left: 12px; }
  .nav { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; border: 0; background: rgba(255,255,255,.85); color: #000; display: grid; place-items: center; }
  .nav.l { left: 12px; } .nav.r { right: 12px; }
  .count { position: absolute; left: 14px; bottom: 12px; font-size: 13px; color: #fff; background: rgba(0,0,0,.55); padding: 4px 12px; border-radius: 99px; }
`;

const initials = (n) => n.split(' ').map((p) => p[0]).join('').slice(0, 2);

export default function CarDetail() {
  const { id } = useParams();
  const car = getCar(id);
  const { saved, toggleSaved, openSignIn } = useApp();

  const [option, setOption] = useState(car?.options[0]);
  const [pickup, setPickup] = useState(null);
  const [ret, setRet] = useState(null);
  const [hours, setHours] = useState(3);
  const [offerOpen, setOfferOpen] = useState(false);
  const [offer, setOffer] = useState('');
  const [error, setError] = useState('');
  const [gallery, setGallery] = useState(false);
  const [shot, setShot] = useState(0);
  const [allReviews, setAllReviews] = useState(false);

  const calc = useMemo(() => {
    if (!car) return null;
    if (option === 'Chauffeur') {
      const base = car.chauffeurPrice + Math.max(0, hours - 3) * car.extraHour;
      const fee = base * 0.03;
      return { lines: [[`First 3 hours`, money(car.chauffeurPrice)], ...(hours > 3 ? [[`${hours - 3} extra hour${hours > 4 ? 's' : ''}`, money((hours - 3) * car.extraHour)]] : [])], subtotal: base, fee, total: base + fee };
    }
    const days = pickup && ret ? daysBetween(pickup, ret) : 1;
    const rate = dailyRateFor(car.dayPrice, days);
    const subtotal = rate * days;
    const fee = subtotal * 0.03;
    return { days, rate, lines: [[`${money(rate)} × ${days} day${days > 1 ? 's' : ''}`, money(subtotal)]], subtotal, fee, total: subtotal + fee };
  }, [car, option, pickup, ret, hours]);

  if (!car) {
    return (
      <Page>
        <Card as="div">
          <h2>We couldn't find that car.</h2>
          <p style={{ color: 'var(--text-soft)', marginBottom: 16 }}>It may have been removed by the owner.</p>
          <Button as={Link} to="/vehicle-listings">Browse all cars</Button>
        </Card>
      </Page>
    );
  }

  const on = saved.includes(car.id);
  const selfDrive = option === 'Self drive';
  const needsDates = selfDrive && !(pickup && ret);

  const sendRequest = () => {
    if (needsDates) {
      setError('Choose your pickup and return dates first.');
      return;
    }
    setError('');
    openSignIn('Sign in to send your booking request.');
  };

  const sendOffer = () => {
    const n = Number(offer);
    const listed = selfDrive ? car.dayPrice : car.chauffeurPrice;
    if (!n || n <= 0) return setError('Enter the amount you would like to offer.');
    if (n >= listed) return setError('Your offer should be lower than the listed price. You can book at the listed price instead.');
    if (n < listed * 0.6) return setError('That offer is too far below the listed price for the owner to consider.');
    setError('');
    openSignIn('Sign in to send your offer to the owner.');
  };

  const heroImg = imageUrl(car.images[shot] || car.images[0]);

  return (
    <Page>
      <Layout>
        <div className="main">
          <div>
            <BackLink to="/vehicle-listings" />
            <div className="crumbs"><Link to="/vehicle-listings">All cars</Link> / <Link to={`/vehicle-listings?city=${car.city}`}>{car.city}</Link></div>
            <div className="titlebar">
              <div>
                <h1>{car.name}</h1>
                <p className="loc">{car.address}</p>
              </div>
              <HeartBtn type="button" $on={on} aria-pressed={on} aria-label={on ? 'Remove from favourites' : 'Save to favourites'} onClick={() => toggleSaved(car.id)}>
                <HeartIcon filled={on} size={22} />
              </HeartBtn>
            </div>
          </div>

          <Hero>
            <img src={heroImg} alt={`${car.year} ${car.name}`} />
            <button type="button" className="view" onClick={() => setGallery(true)}>
              <ImagesIcon size={18} /> View {car.images.length} photo{car.images.length > 1 ? 's' : ''}
            </button>
          </Hero>

          <Reveal>
            <Card>
              <h2>Effective pricing</h2>
              {car.hasSelf ? (
                <Tiles>
                  {DAY_FACTORS.map((f, i) => (
                    <div className="tile" key={i}>
                      <span>{i === 5 ? '6 days or more' : `${i + 1} day${i ? 's' : ''}`}</span>
                      <b>{money(car.dayPrice * f)}<small>/day</small></b>
                    </div>
                  ))}
                </Tiles>
              ) : (
                <Tiles>
                  <div className="tile"><span>First 3 hours</span><b>{money(car.chauffeurPrice)}</b></div>
                  <div className="tile"><span>Each extra hour</span><b>{money(car.extraHour)}</b></div>
                  <div className="tile"><span>6 hours</span><b>{money(car.chauffeurPrice + 3 * car.extraHour)}</b></div>
                  <div className="tile"><span>10 hours</span><b>{money(car.chauffeurPrice + 7 * car.extraHour)}</b></div>
                </Tiles>
              )}
            </Card>
          </Reveal>

          <Host>
            <div className="who">
              <span className="avatar" aria-hidden="true">{initials(car.host.name)}</span>
              <div>
                <div className="label">Hosted by</div>
                <div className="name">{car.host.name}</div>
                <div className="since">{car.host.since}</div>
              </div>
            </div>
            <Button type="button" $variant="ghost" onClick={() => openSignIn('Sign in to message the host.')}>
              <MessageIcon size={18} /> Message host
            </Button>
          </Host>

          <Reveal>
            <Card>
              <h2>Specifications</h2>
              <Specs>
                <div><span>Transmission</span><b>{car.trans.toUpperCase()}</b></div>
                <div><span>Fuel</span><b>{car.fuel.toUpperCase()}</b></div>
                <div><span>Seats</span><b>{car.seats} seats</b></div>
                <div><span>Doors</span><b>{car.doors} doors</b></div>
                <div><span>Year</span><b>{car.year}</b></div>
              </Specs>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <h2>About this car</h2>
              <p style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>{car.about}</p>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <h2>Features</h2>
              <Features>
                <li><CheckIcon size={16} />{car.seats} Passengers</li>
                <li><CheckIcon size={16} />{car.trans.toUpperCase()}</li>
                <li><CheckIcon size={16} />{car.doors} Doors</li>
                {car.features.map((f) => (
                  <li key={f}><CheckIcon size={16} />{f}</li>
                ))}
              </Features>
            </Card>
          </Reveal>

          <Reveal>
            <Card>
              <h2>Distance &amp; pricing</h2>
              <Specs>
                <div><span>Kilometres allowed</span><b>{typeof car.kmAllowed === 'number' ? `${car.kmAllowed} km` : car.kmAllowed}</b></div>
                <div><span>Price per extra km</span><b>{money(car.extraKm)} /km</b></div>
                <div style={{ gridColumn: '1 / -1' }}><span>Pickup location</span><b>{car.address}</b></div>
              </Specs>
            </Card>
          </Reveal>

          <Reveal>
            <Reviews>
              <h2 style={{ marginBottom: 6 }}>Reviews</h2>
              {car.rating ? (
                <>
                  <div className="score"><StarIcon size={20} /> {car.rating.toFixed(2)} · {car.reviews.length} review{car.reviews.length > 1 ? 's' : ''}</div>
                  <p className="note">From verified renters in the past 12 months</p>
                  <div className="list">
                    {(allReviews ? car.reviews : car.reviews.slice(0, 2)).map((r, i) => (
                      <div className="rev" key={i}>
                        <span className="av" aria-hidden="true">{r.name[0]}</span>
                        <div>
                          <b>{r.name}</b>
                          <small>{r.date}</small>
                          <p>“{r.text}”</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {car.reviews.length > 2 && !allReviews && (
                    <button type="button" className="more" onClick={() => setAllReviews(true)}>See all reviews →</button>
                  )}
                </>
              ) : (
                <p className="note">No reviews yet. Be the first to rent this car and leave one.</p>
              )}
            </Reviews>
          </Reveal>
        </div>

        <aside className="aside" aria-label="Book this car">
          <Booking $offerOpen={offerOpen}>
            <div className="top">
              <div>
                <div className="big">
                  {money(selfDrive ? car.dayPrice : car.chauffeurPrice)}{' '}
                  <span className="unit">/ {selfDrive ? 'day' : 'first 3 hours'}</span>
                </div>
                <div className="opt">{option}</div>
              </div>
            </div>
            {selfDrive && <span className="badge">Up to 25% off 6+ days</span>}

            {car.options.length > 1 && (
              <div className="seg" role="group" aria-label="Rental option">
                {car.options.map((o) => (
                  <button key={o} type="button" aria-pressed={option === o} onClick={() => { setOption(o); setError(''); }}>
                    {o}
                    <small>{o === 'Self drive' ? `${money(car.dayPrice)} / day` : `${money(car.chauffeurPrice)} / 3 hours`}</small>
                  </button>
                ))}
              </div>
            )}
            {car.options.length === 1 && (
              <div>
                <div className="opt" style={{ marginBottom: 6 }}>Rental option</div>
                <div className="seg"><button type="button" aria-pressed="true">{option}<small>{selfDrive ? `${money(car.dayPrice)} / day` : `${money(car.chauffeurPrice)} / first 3 hours`}</small></button></div>
              </div>
            )}

            {selfDrive ? (
              <DateRange pickup={pickup} ret={ret} onChange={({ pickup: p, ret: r }) => { setPickup(p); setRet(r); setError(''); }} />
            ) : (
              <>
                <DateRange single pickup={pickup} ret={pickup} onChange={({ pickup: p }) => setPickup(p)} />
                <label className="opt" htmlFor="hours">Hours of chauffeur service</label>
                <select id="hours" value={hours} onChange={(e) => setHours(Number(e.target.value))} style={{ minHeight: 48, borderRadius: 14, border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)', padding: '0 14px', font: 'inherit' }}>
                  {Array.from({ length: 10 }, (_, i) => i + 3).map((h) => (
                    <option key={h} value={h}>{h} hours</option>
                  ))}
                </select>
              </>
            )}

            <div className="sum" aria-live="polite">
              {calc.lines.map(([a, b]) => (
                <div key={a}><span>{a}</span><span>{b}</span></div>
              ))}
              <div><span>Service fee (3%)</span><span>{money(calc.fee)}</span></div>
              <div className="total"><span>Total</span><span>{money(calc.total)}</span></div>
            </div>

            {error && <p className="error" role="alert">{error}</p>}
            <Button type="button" onClick={sendRequest} style={{ minHeight: 50 }}>Rent now</Button>
            <Button type="button" $variant="ghost" aria-expanded={offerOpen} onClick={() => setOfferOpen((o) => !o)}>
              {offerOpen ? 'Hide offer' : "Don't like the price? Make an offer"}
            </Button>
            <div className="offer">
              <div>
                <div className="offer-inner">
                  <label className="opt" htmlFor="offer">Your offer ({selfDrive ? 'per day' : 'for the first 3 hours'})</label>
                  <Input id="offer" type="number" min="0" inputMode="numeric" placeholder={`e.g. ${Math.round((selfDrive ? car.dayPrice : car.chauffeurPrice) * 0.9)}`} value={offer} onChange={(e) => setOffer(e.target.value)} />
                  <Button type="button" onClick={sendOffer}>Send offer to owner</Button>
                </div>
              </div>
            </div>
            <p className="small">You won't be charged yet. The owner has up to 24 hours to respond.</p>
          </Booking>
        </aside>
      </Layout>

      <Modal open={gallery} onClose={() => setGallery(false)} label="Photos" width={980}>
        <Lightbox>
          <img src={imageUrl(car.images[shot])} alt={`${car.year} ${car.name}, photo ${shot + 1}`} />
          <div className="back"><ModalBack onClick={() => setGallery(false)} /></div>
          <div className="close"><ModalClose onClick={() => setGallery(false)} /></div>
          {car.images.length > 1 && (
            <>
              <button type="button" className="nav l" aria-label="Previous photo" onClick={() => setShot((shot - 1 + car.images.length) % car.images.length)}><ChevronLeft size={22} /></button>
              <button type="button" className="nav r" aria-label="Next photo" onClick={() => setShot((shot + 1) % car.images.length)}><ChevronRight size={22} /></button>
            </>
          )}
          <span className="count">{shot + 1} / {car.images.length}</span>
        </Lightbox>
      </Modal>
    </Page>
  );
}
