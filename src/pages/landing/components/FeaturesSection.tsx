import {
  Building2,
  FileText,
  LineChart,
  UserCog,
  Users,
} from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: LineChart,
    title: "Financial overview",
    description:
      "Total rent, total mortgage, and net income calculated automatically across every property.",
    span: "sm:col-span-2",
    featured: true,
  },
  {
    icon: Building2,
    title: "Properties",
    description:
      "Track names, addresses, rent, and mortgage for each property you own.",
    span: "",
    featured: false,
  },
  {
    icon: FileText,
    title: "Document storage",
    description:
      "Keep insurance policies and contracts attached to each property, secured behind signed links.",
    span: "",
    featured: false,
  },
  {
    icon: Users,
    title: "Tenants",
    description:
      "Store tenant details and link them directly to the properties they rent.",
    span: "",
    featured: false,
  },
  {
    icon: UserCog,
    title: "Managers",
    description:
      "Assign property managers with company and contact details for quick reference.",
    span: "",
    featured: false,
  },
] as const;

export const FeaturesSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Everything you need to run your portfolio
        </h2>
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          A focused toolkit for independent landlords and small portfolio
          owners — without the complexity of enterprise software.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description, span, featured }) => (
          <Card
            key={title}
            className={`border-slate-200/80 shadow-sm transition-shadow hover:shadow-md ${span} ${
              featured
                ? "bg-gradient-to-br from-blue-950 to-slate-900 text-white"
                : "bg-white"
            }`}
          >
            <CardHeader>
              <div
                className={`mb-2 flex size-10 items-center justify-center rounded-lg ${
                  featured
                    ? "bg-white/15 text-white"
                    : "bg-blue-950/10 text-blue-950"
                }`}
              >
                <Icon className="size-5" />
              </div>
              <CardTitle
                className={`text-lg ${featured ? "text-white" : "text-slate-900"}`}
              >
                {title}
              </CardTitle>
              <CardDescription
                className={`text-base leading-relaxed ${
                  featured ? "text-blue-100" : ""
                }`}
              >
                {description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
