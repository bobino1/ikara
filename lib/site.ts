/** Centrálne kontaktné a firemné údaje autoškoly. */
export const site = {
  name: "Autoškola IKARA",
  shortName: "IKARA",
  phone: "02 / 622 50 108",
  mobile: "0908 723 348",
  mobileHref: "tel:0908723348",
  email: "jozefdanadai@autoskola-ikara.sk",
  address: {
    line1: "Hrobákova 34",
    city: "851 01 Bratislava",
    full: "Hrobákova 34, 851 01 Bratislava",
  },
  hours: [
    { day: "Pondelok", value: "15:00 – 18:30", open: true },
    { day: "Utorok", value: "zatvorené", open: false },
    { day: "Streda", value: "15:00 – 18:30", open: true },
    { day: "Štvrtok", value: "zatvorené", open: false },
    { day: "Piatok", value: "zatvorené", open: false },
  ],
} as const;

/** Položky hlavnej navigácie (cesta + popis). */
export const navItems = [
  { href: "/", label: "Domov" },
  { href: "/o-nas", label: "O nás" },
  { href: "/o-kurze", label: "O kurze" },
  { href: "/kondicne-jazdy", label: "Kondičné jazdy" },
  { href: "/kurzy", label: "Kurzy" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
