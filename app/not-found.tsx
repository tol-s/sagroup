import Image from "next/image";
import Button from "@/components/Button";
import { images } from "@/data/images";
import { telLink } from "@/lib/contact";

export default function NotFound() {
  return (
    <section data-hero="dark" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-bone">
      <Image src={images.notFound} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" aria-hidden />
      <div className="wrap w-full pb-16 pt-36 md:pb-24">
        <p className="label text-bone/60">Error 404</p>
        <p className="display mt-6 text-[clamp(6rem,26vw,24rem)] leading-[0.8] text-bone/15" aria-hidden>
          404
        </p>
        <h1 className="display display-lg mt-2 uppercase">Page not found.</h1>
        <p className="lead mt-6 max-w-lg text-bone/75">The page you are looking for has moved or no longer exists. Let&apos;s get you back on solid ground.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="light">Back to Home</Button>
          <Button href="/projects" variant="ghost-light">View Projects</Button>
          <Button href={telLink(0)} variant="ghost-light">Call Now</Button>
        </div>
      </div>
    </section>
  );
}
