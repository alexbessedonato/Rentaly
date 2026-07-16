import { useFinancialsCardSet } from "../hooks/useFinancialsCardSet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const FinancialsCardSet = () => {
  const { cards, isError } = useFinancialsCardSet();

  if (isError) {
    return <p className="text-sm text-red-600">Error loading financial data.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {cards.map((card) => (
        <Card key={card.title} className="w-full">
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-blue-950">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
