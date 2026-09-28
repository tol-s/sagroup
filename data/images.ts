import { unsplash } from "@/lib/unsplash";

/**
 * Central image library.
 * Every photograph on the website is referenced from here (or from data/projects.ts).
 * All images are free-to-use Unsplash photographs used as SAMPLE imagery.
 * Replace any value with a local path (e.g. "/images/hero.jpg" placed in /public/images)
 * or another Unsplash photo id.
 */
export const images = {
  // Hero & brand
  hero: unsplash("1600596542815-ffad4c1539a9"),
  intro: unsplash("1503387762-592deb58ef4e"),
  introDetail: unsplash("1487958449943-2429e8be8625"),
  aboutHero: unsplash("1511818966892-d7d671e672a2"),
  aboutStudio: unsplash("1581094794329-c8112a89af12"),
  aboutSite: unsplash("1541888946425-d81bb19240f5"),
  processHero: unsplash("1504307651254-35680f356dfd"),
  servicesHero: unsplash("1600585154340-be6161a56a0c"),
  contactHero: unsplash("1512917774080-9991f1c4c750"),
  cta: unsplash("1613977257363-707ba9348227"),
  karachi: unsplash("1580587771525-78b9dba3b914"),
  notFound: unsplash("1487958449943-2429e8be8625"),

  // Construction & trades
  plans: unsplash("1503387762-592deb58ef4e"),
  drawings: unsplash("1503387762-592deb58ef4e"),
  site: unsplash("1541888946425-d81bb19240f5"),
  worker: unsplash("1504307651254-35680f356dfd"),
  structure: unsplash("1531834685032-c34bf0d84c77"),
  scaffolding: unsplash("1508450859948-4e04fabaa4ea"),
  engineer: unsplash("1581094794329-c8112a89af12"),
  electrical: unsplash("1621905251189-08b45d6a269e"),
  masonry: unsplash("1589939705384-5185137a7f0f"),
  painting: unsplash("1562259949-e8e7689d7828"),

  // Interiors
  living: unsplash("1600607687939-ce8a6c25118c"),
  living2: unsplash("1600210492486-724fe5c67fb0"),
  living3: unsplash("1618221195710-dd6b41faaea6"),
  living4: unsplash("1502672260266-1c1ef2d93688"),
  living5: unsplash("1493809842364-78817add7ffb"),
  living6: unsplash("1560448204-e02f11c3d0e2"),
  kitchen: unsplash("1484154218962-a197022b5858"),
  kitchen2: unsplash("1556911220-bff31c812dba"),
  kitchen3: unsplash("1556912173-3bb406ef7e77"),
  kitchen4: unsplash("1556911220-bff31c812dba"),
  bedroom: unsplash("1616594039964-ae9021a400a0"),
  bedroom2: unsplash("1600607687644-c7171b42498f"),
  bedroom3: unsplash("1540518614846-7eded433c457"),
  bathroom: unsplash("1552321554-5fefe8c9ef14"),
  bathroom2: unsplash("1584622650111-993a426fbf0a"),
  bathroom3: unsplash("1620626011761-996317b8d101"),
  interiorLuxe: unsplash("1613545325278-f24b0cae1224"),
  interior: unsplash("1505691938895-1758d7feb511"),
  interior2: unsplash("1600566753086-00f18fb6b3ea"),
  interior3: unsplash("1560448204-e02f11c3d0e2"),

  // Exteriors
  villa: unsplash("1613490493576-7fde63acd811"),
  villa2: unsplash("1613977257363-707ba9348227"),
  house: unsplash("1600585154340-be6161a56a0c"),
  house2: unsplash("1600596542815-ffad4c1539a9"),
  house3: unsplash("1512917774080-9991f1c4c750"),
  house4: unsplash("1580587771525-78b9dba3b914"),
  house5: unsplash("1564013799919-ab600027ffc6"),
  house6: unsplash("1600566753190-17f0baa2a6c3"),
  house7: unsplash("1600047509807-ba8f99d2cdde"),
  house8: unsplash("1600607688969-a5bfcd646154"),
  house9: unsplash("1494526585095-c41746248156"),
  house10: unsplash("1449844908441-8829872d2607"),
  house11: unsplash("1480074568708-e7b720bb3f09"),
  house12: unsplash("1600585154526-990dced4db0d"),
  house13: unsplash("1600573472550-8090b5e0745e"),
  apartments: unsplash("1567496898669-ee935f5f647a"),  facade: unsplash("1487958449943-2429e8be8625"),
  facade2: unsplash("1511818966892-d7d671e672a2"),

  // Materials & details
  lighting: unsplash("1513506003901-1e6a229e2d15"),
  lamp: unsplash("1507473885765-e6ed057f782c"),
  glass: unsplash("1511818966892-d7d671e672a2"),
} as const;

export type ImageKey = keyof typeof images;
