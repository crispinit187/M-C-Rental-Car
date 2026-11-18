const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

const make = (children, extra = {}) =>
  function Icon({ size, ...props }) {
    const dims = size ? { width: size, height: size } : {};
    return (
      <svg {...base} {...extra} {...dims} {...props}>
        {children}
      </svg>
    );
  };

export const SearchIcon = make(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const ClockIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const PinIcon = make(<><path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></>);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18" />);
export const ChevronLeft = make(<path d="m15 6-6 6 6 6" />);
export const ChevronRight = make(<path d="m9 6 6 6-6 6" />);
export const ChevronDown = make(<path d="m6 9 6 6 6-6" />);
export const HeartIcon = ({ filled, size, ...props }) => (
  <svg {...base} {...(size ? { width: size, height: size } : {})} fill={filled ? 'currentColor' : 'none'} {...props}>
    <path d="M12 20.5s-7.5-4.6-9-9.4C2 7.800 4 5 7 5c1.900 0 3.400 1 5 3 1.600-2 3.100-3 5-3 3 0 5 2.800 4 6.100-1.500 4.800-9 9.400-9 9.400Z" />
  </svg>
);
export const StarIcon = ({ size, ...props }) => (
  <svg {...base} {...(size ? { width: size, height: size } : {})} fill="currentColor" stroke="none" {...props}>
    <path d="m12 2.800 2.800 5.800 6.300.9-4.600 4.400 1.100 6.300L12 17.200 6.400 20.200l1.100-6.300L3 9.500l6.300-.9L12 2.800Z" />
  </svg>
);
export const CalendarIcon = make(<><rect x="3.500" y="5" width="17" height="15.500" rx="3" /><path d="M8 3v4M16 3v4M3.500 10h17" /></>);
export const SunIcon = make(<><circle cx="12" cy="12" r="4" /><path d="M12 2.500v2.500M12 19v2.500M4.500 4.500l1.800 1.800M17.700 17.700l1.800 1.800M2.500 12H5M19 12h2.500M4.500 19.500l1.800-1.800M17.700 6.300l1.800-1.800" /></>);
export const MoonIcon = make(<path d="M20 14.500A8.500 8.500 0 0 1 9.500 4 8.500 8.500 0 1 0 20 14.500Z" />);
export const UserIcon = make(<><circle cx="12" cy="8" r="4" /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" /></>);
export const GearIcon = make(<><circle cx="12" cy="12" r="3" /><path d="M12 2.500v3M12 18.500v3M2.500 12h3M18.500 12h3M5.300 5.300l2.100 2.100M16.600 16.600l2.100 2.100M5.300 18.700l2.100-2.100M16.600 7.400l2.100-2.100" /></>);
export const SeatIcon = make(<><circle cx="12" cy="7" r="3" /><path d="M5 21v-2a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v2" /></>);
export const MessageIcon = make(<path d="M21 12a8 8 0 0 1-11.800 7L4 20.500l1.500-4.800A8 8 0 1 1 21 12Z" />);
export const CheckIcon = make(<path d="m5 12.500 4.500 4.500L19 7.500" />);
export const ShieldIcon = make(<><path d="M12 3 4.500 6v6c0 4.500 3.200 7.800 7.500 9 4.300-1.200 7.500-4.500 7.500-9V6L12 3Z" /><path d="m9 12 2.200 2.200L15.500 10" /></>);
export const TagIcon = make(<><path d="M3 12.500V4h8.500L21 13.500 13.500 21 3 12.500Z" /><circle cx="8" cy="9" r="1.200" /></>);
export const GiftIcon = make(<><rect x="3" y="8" width="18" height="5" rx="1" /><path d="M5 13v7h14v-7M12 8v12M12 8c-2.500 0-4.500-1-4.500-2.500S9 3 12 8Zm0 0c2.500 0 4.500-1 4.500-2.500S15 3 12 8Z" /></>);
export const KeyIcon = make(<><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3" /></>);
export const CarIcon = make(<><path d="M4 16v-4l2-5h12l2 5v4M4 16h16M4 16v2.500M20 16v2.500" /><circle cx="8" cy="14.500" r=".8" fill="currentColor" /><circle cx="16" cy="14.500" r=".8" fill="currentColor" /></>);
export const SwapIcon = make(<path d="M4 8h14M14 4l4 4-4 4M20 16H6M10 12l-4 4 4 4" />);
export const ImagesIcon = make(<><rect x="3" y="5" width="14" height="12" rx="2" /><path d="M7 19h12a2 2 0 0 0 2-2V9M3 14l4-3 5 4" /></>);
export const PhoneIcon = make(<path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />);
export const MailIcon = make(<><rect x="3" y="5" width="18" height="14" rx="2.500" /><path d="m4 7 8 6 8-6" /></>);
export const WhatsappIcon = make(<><path d="M20.500 12a8.500 8.500 0 0 1-12.700 7.400L3.500 20.500l1.200-4.200A8.500 8.500 0 1 1 20.500 12Z" /><path d="M9 8.500c0 3.500 3 6.500 6.500 6.500l1-1.500-2.200-1-1 .8a4.500 4.500 0 0 1-2-2l.8-1-1-2.200L9 8.500Z" /></>);
export const XIcon = make(<path d="M4 4l16 16M20 4 4 20" />);
export const LinkedinIcon = make(<><rect x="3.500" y="3.500" width="17" height="17" rx="3" /><path d="M8 10.500V16M8 7.800v.1M12 16v-5.500M12 13c0-1.500 1-2.500 2.300-2.500S16.500 11.500 16.500 13V16" /></>);
export const InstagramIcon = make(<><rect x="3.500" y="3.500" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r=".8" fill="currentColor" /></>);
export const YoutubeIcon = make(<><rect x="3" y="6" width="18" height="12" rx="4" /><path d="m10.500 9.500 4 2.500-4 2.500v-5Z" fill="currentColor" /></>);
export const ArrowRight = make(<path d="M5 12h14M13 6l6 6-6 6" />);
export const InfoIcon = make(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.1" /></>);
export const UploadIcon = make(<><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>);
export const ScanIcon = make(<><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><path d="M4 12h16" /></>);
