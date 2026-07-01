import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardPreview } from "./DashboardPreview";

const highlights = [
  "Rent & mortgage tracking",
  "Secure document storage",
  "Tenants & managers in one place",
] as const;

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,58,138,0.12),transparent_50%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-start lg:gap-10 lg:py-24">
        <div className="flex flex-col items-start text-left lg:sticky lg:top-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-950/10 bg-white px-4 py-1.5 text-sm font-medium text-blue-950 shadow-sm">
            <Building2 className="size-4" />
            Property management, simplified
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Your whole portfolio,
            <span className="block text-blue-950">clearly organized</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Rentaly brings properties, tenants, managers, and finances
            into a single dashboard — so you always know what you own, who's
            renting, and how much you're earning.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-11 bg-blue-950 px-6 text-white hover:bg-blue-900"
              onClick={() => navigate({ to: "/signup" })}
            >
              Get started free
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-11 px-6"
              onClick={() => navigate({ to: "/login" })}
            >
              Sign in
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <CheckCircle2 className="size-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:pl-4">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-blue-950/5 to-transparent"
          />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};
