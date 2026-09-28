# SA Group: Residential Construction Website

Marketing website for **SA Group**, a residential architecture and construction company in Karachi, Pakistan.
It presents services, the construction process and a project portfolio, and turns visitors into enquiries through the contact form, phone and WhatsApp.

> **Modern Design. Solid Construction. Complete Execution.**

This repository is standalone. It shares no code, database, environment variables, domains or infrastructure with any other project.

---

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (design tokens in `styles/globals.css`) |
| Motion | Framer Motion, Lenis smooth scroll |
| Icons | Lucide React |
| Images | `next/image` (AVIF/WebP) with Unsplash sample photography |
| Email | Resend, sent from a Next.js Route Handler (`app/api/contact/route.ts`) |
| Hosting | Vercel |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, intro, services, featured projects, quality, materials, why us, process, Karachi coverage, testimonials, CTA |
| `/about` | Company, philosophy, disciplines, coverage, client experience |
| `/services` | All 23 services, each with image, description, inclusions and CTA (anchors: `/services#slug`) |
| `/projects` | Portfolio with instant filters (All, Modern Homes, Villas, Elevation, Turnkey, Renovation) |
| `/projects/[slug]` | Project detail: hero, overview, details, design approach, features, gallery with lightbox, previous/next |
| `/process` | Interactive 10-step construction timeline |
| `/contact` | Lead form, phone numbers, WhatsApp |
| `/privacy` | Privacy policy |
| 404 | Custom not-found page |

`/sitemap.xml`, `/robots.txt`, Open Graph/Twitter metadata, canonical URLs and JSON-LD (GeneralContractor / LocalBusiness, BreadcrumbList, HowTo, ItemList) are generated automatically.

---

## Local setup

Requirements: Node.js 20.9 or newer, npm.

```bash
git clone https://github.com/tol-s/sagroup.git
cd sagroup
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

### Development commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `CONTACT_EMAIL_1` | Yes | First recipient of every enquiry (`talhasaeed687@gmail.com`) |
| `CONTACT_EMAIL_2` | Yes | Second recipient of every enquiry (`atiqu8104@gmail.com`) |
| `EMAIL_FROM` | Yes | Sender, e.g. `SA Group <enquiries@yourdomain.com>` |
| `RESEND_API_KEY` | Yes | Resend API key (server-side only) |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL for canonical links and sitemap. Defaults to `https://sagroup.vercel.app` |

Never commit `.env` / `.env.local`. They are git-ignored; only `.env.example` is tracked.

## Email configuration (Resend)

1. Create an account at [resend.com](https://resend.com).
2. **Verify a sending domain** (Domains → Add domain → add the DNS records it shows). This is required to deliver to both recipient addresses. Resend's shared test sender `onboarding@resend.dev` can only deliver to the email address that owns the Resend account.
3. Create an API key (API Keys → Create, "Sending access").
4. Set `RESEND_API_KEY` and `EMAIL_FROM` (using the verified domain) locally and in Vercel.

How the form works:

- Client and server both validate required fields, phone number format, optional email and message length.
- Inputs are sanitised and HTML-escaped before they are placed in emails.
- The submit button locks while sending; each submission carries an idempotency key so a double submit cannot send twice.
- A hidden honeypot field, a minimum fill time and a per-IP rate limit reduce spam.
- Each enquiry is sent to **both** `CONTACT_EMAIL_1` and `CONTACT_EMAIL_2` with subject **"New Construction Website Enquiry"** (name, phone, email, location, service, project type, budget, message, timestamp in PKT). Reply-To is set to the customer's email when provided.
- If the customer provides an email, they receive a confirmation email.
- If email is not configured, the form shows a friendly error with the phone and WhatsApp alternatives.

---

## Production build & Vercel deployment

The Vercel project **`sagroup`** (team Tegnol) is connected to this GitHub repository. Production deploys from `main`; other branches get preview deployments.

1. Push to `main`, and Vercel builds and deploys automatically.
2. Environment variables are managed in Vercel → Project `sagroup` → Settings → Environment Variables. After changing them, redeploy (Deployments → ⋯ → Redeploy).
3. To add a custom domain: Project → Settings → Domains. Then set `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

---

## Project structure

```
app/                    Routes (App Router)
  api/contact/route.ts  Enquiry email endpoint (Resend)
  projects/[slug]/      Project detail pages (statically generated)
  layout.tsx            Fonts, metadata, header/footer, global UI
  template.tsx          Page transition wrapper
  sitemap.ts robots.ts  SEO files
components/             Reusable UI (Header, Footer, Button, SectionHeading, ProjectCard,
                        ServiceCard, ProjectGallery, ContactForm, CTASection, AnimatedText,
                        ImageReveal, PageTransition, MobileContactBar, ...)
components/home/        Home-page sections
data/                   ALL editable content
  site.ts               Company name, phones, emails, location, social, stats
  images.ts             Central image library
  services.ts           23 services + contact dropdown options
  projects.ts           Sample projects, filters, galleries
  process.ts            Construction steps
  home.ts               Quality stages, materials, reasons, service areas
  testimonials.ts       Testimonials (placeholders for now)
lib/                    Validation, email templates, schema.org, helpers
styles/globals.css      Tailwind v4 theme tokens (colours, fonts) and base styles
public/                 Static files (put your own photos in public/images)
```

---

## Updating content

### Change company information, name, phone numbers
Edit **`data/site.ts`**. `companyName` updates the logo wordmark, page titles, footer, emails and structured data everywhere.

- Phone numbers: edit the `phones` array. Each entry has `name` and `role` (shown next to the number), `display` (shown on site), `tel` (for `tel:` links, e.g. `+923452008343`) and `whatsapp` (digits only, country code first, e.g. `923452008343`). Keep them in sync.
- The **first** entry is the main contact (currently Atiq Ur Rehman, CEO, +92 345 2008343). Every "Call Now" button, WhatsApp button, floating WhatsApp icon and mobile contact bar links to it. The second entry (M Abubakar, +92 321 2008343) is shown as the secondary contact.
- WhatsApp pre-filled message: `whatsappMessage`.
- Social links: set `href` for each profile. Empty links render as greyed-out text, not as links.
- Stats: add a `value` to show a statistic on the About page. Leave empty to hide. Only publish verified numbers.

Enquiry **recipients** are not in code. Change `CONTACT_EMAIL_1` / `CONTACT_EMAIL_2` in Vercel.

### Update services
Edit **`data/services.ts`**. Each service has `slug`, `number`, `title`, `shortDescription`, `description`, `image`, `included` and `formLabel`. The home page shows the slugs listed in `featuredServiceSlugs`. The contact dropdown uses `serviceOptions`.

### Update projects
Edit **`data/projects.ts`**. The six current projects are **sample / demonstration projects** and are labelled that way on the site.

To add a real project, copy an entry and change its fields (`slug` becomes the URL `/projects/<slug>`). Use `filters` to control which filter tabs it appears under. When all projects are real, set `showSampleNotice = false` to remove the sample labels.

### Replace images
- Site-wide imagery lives in **`data/images.ts`**; project imagery lives in each project's `heroImage` and `gallery` in `data/projects.ts`.
- To use your own photo, put it in `public/images/...` and replace the value with the path, e.g. `"/images/projects/villa-front.jpg"`. `unsplash()` passes local paths through unchanged.
- To use another Unsplash photo, pass its id (the part after `photo-` in the image URL), e.g. `unsplash("1600585154340-be6161a56a0c")`.
- Recommended: landscape images at least 2400px wide for heroes, 1600px for galleries. `next/image` handles resizing and modern formats.

### Testimonials
Edit **`data/testimonials.ts`**. The six current testimonials (English and Roman Urdu) are **samples with fictional names**. Replace them with real, client-approved quotes (set `lang` to `"en"` or `"ur-Latn"`), then set `showSampleTestimonialNotice = false` to remove the "Sample testimonials" label.

### Colours and fonts
Design tokens (`bone`, `ink`, `concrete`, `bronze`, ...) are defined in `styles/globals.css` under `@theme`. Fonts (Inter, Inter Tight, Instrument Serif) are loaded in `app/layout.tsx` via `next/font`.

---

## Accessibility & performance notes

- Semantic landmarks, a single `h1` per page, skip link, visible focus states, labelled form fields with inline error messages, keyboard-operable lightbox and menu.
- All motion respects `prefers-reduced-motion` (Lenis, parallax and reveals are disabled or simplified).
- The custom cursor only runs on fine-pointer (mouse) devices.
- Images are lazy-loaded and served as AVIF/WebP at responsive sizes; only hero images are prioritised.

## Image credits

Sample photography is from [Unsplash](https://unsplash.com) and used under the Unsplash License. Replace with the company's own project photography before relying on it as a portfolio.
