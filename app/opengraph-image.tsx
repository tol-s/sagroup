import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/data/site";

/**
 * Link preview image (WhatsApp, Facebook, LinkedIn, X): the home banner photo
 * under a dark overlay, with the logo, company name, tagline and contacts.
 * Generated at build time.
 */
export const alt = `${site.companyName}: architectural design and residential construction in Karachi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/jpeg";

/** Same photo as the home page banner, requested as a JPEG at preview size. */
const BANNER = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?fit=crop&w=1200&h=630&q=80&fm=jpg";

async function bannerDataUrl() {
  try {
    const res = await fetch(BANNER, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return `data:image/jpeg;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
  } catch {
    return null; // no network: the card still renders on the dark background
  }
}

export default async function Image() {
  const dir = join(process.cwd(), "assets/og");
  const [display, regular, medium, banner] = await Promise.all([
    readFile(join(dir, "inter-tight-600.woff")),
    readFile(join(dir, "inter-400.woff")),
    readFile(join(dir, "inter-500.woff")),
    bannerDataUrl(),
  ]);
  const [main, ...people] = site.phones;
  const domain = site.domain;

  const png = new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#141412", fontFamily: "Inter" }}>
        {banner && (
          <img src={banner} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: 1200, height: 630, objectFit: "cover", opacity: 0.2 }} />
        )}
        {/* Shadow at the bottom so the contacts stay crisp */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(180deg, rgba(20,20,18,0.35) 0%, rgba(20,20,18,0.55) 45%, rgba(20,20,18,0.97) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", padding: "56px 64px", color: "#f4f1ec" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", width: 64, height: 64, border: "2px solid #f4f1ec", padding: 7 }}>
              <div style={{ position: "absolute", left: 7, top: 7, width: 2, height: 16, background: "rgba(244,241,236,0.55)" }} />
              <div style={{ position: "absolute", left: 7, top: 7, width: 16, height: 2, background: "rgba(244,241,236,0.55)" }} />
              <div style={{ fontFamily: "Inter Tight", fontSize: 22, fontWeight: 600, lineHeight: 1 }}>SA</div>
            </div>
            <div style={{ fontFamily: "Inter Tight", fontSize: 30, fontWeight: 600, letterSpacing: 6 }}>{site.companyName.toUpperCase()}</div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 18, fontWeight: 500, letterSpacing: 4, color: "rgba(244,241,236,0.75)" }}>
              <div style={{ width: 40, height: 2, background: "rgba(244,241,236,0.75)" }} />
              ARCHITECTURE · CONSTRUCTION · KARACHI
            </div>
            <div style={{ marginTop: 22, fontFamily: "Inter Tight", fontSize: 68, fontWeight: 600, lineHeight: 0.98, letterSpacing: -2, textTransform: "uppercase", maxWidth: 820 }}>
              We build homes designed to stand out.
            </div>
            <div style={{ marginTop: 20, fontSize: 24, color: "rgba(244,241,236,0.85)" }}>Design · Grey structure · Finishing · Turnkey homes</div>
          </div>

          {/* Contacts */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderTop: "1px solid rgba(244,241,236,0.25)", paddingTop: 22 }}>
            <div style={{ display: "flex", gap: 48 }}>
              {people.map((p) => (
                <div key={p.tel} style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 2, color: "rgba(244,241,236,0.65)" }}>{`${p.name}, ${p.role}`.toUpperCase()}</div>
                  <div style={{ marginTop: 6, fontSize: 26, fontWeight: 500 }}>{p.display}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
              <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: 2, color: "rgba(244,241,236,0.65)" }}>{`CALL & WHATSAPP · ${domain.toUpperCase()}`}</div>
              <div style={{ marginTop: 6, fontSize: 30, fontWeight: 500 }}>{main.display}</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: display, weight: 600, style: "normal" },
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: medium, weight: 500, style: "normal" },
      ],
    },
  );

  // WhatsApp prefers small previews: re-encode the PNG as a compact JPEG.
  const buf = Buffer.from(await png.arrayBuffer());
  try {
    const sharp = (await import("sharp")).default;
    const jpg = await sharp(buf).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    return new Response(new Uint8Array(jpg), { headers: { "Content-Type": "image/jpeg" } });
  } catch {
    return new Response(new Uint8Array(buf), { headers: { "Content-Type": "image/png" } });
  }
}
