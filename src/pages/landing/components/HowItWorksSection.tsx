const steps = [
  {
    step: "01",
    title: "Add your properties",
    description:
      "Enter each property with its rent, mortgage, and address, then attach insurance and contract documents.",
  },
  {
    step: "02",
    title: "Link tenants & managers",
    description:
      "Assign tenants to the properties they rent and connect the managers responsible for each one.",
  },
  {
    step: "03",
    title: "Track your finances",
    description:
      "Your dashboard rolls everything up into total rent, mortgage, and net income at a glance.",
  },
] as const;

export const HowItWorksSection = () => {
  return (
    <section className="border-y border-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Up and running in three steps
          </h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            No setup headaches — just add what you own and let the dashboard do
            the math.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map(({ step, title, description }) => (
            <div key={step} className="relative">
              <span className="text-4xl font-semibold text-blue-950/15">
                {step}
              </span>
              <h3 className="mt-2 text-lg font-medium text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
