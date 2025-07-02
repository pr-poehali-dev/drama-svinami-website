import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface CaseItem {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
  image: string;
}

const CASE_ITEMS: CaseItem[] = [
  {
    id: "1",
    name: "Свинка Классик",
    rarity: "common",
    price: 100,
    image: "🐷",
  },
  { id: "2", name: "Золотая Свинка", rarity: "rare", price: 500, image: "🐽" },
  {
    id: "3",
    name: "Космическая Свинка",
    rarity: "epic",
    price: 1000,
    image: "🚀🐷",
  },
  {
    id: "4",
    name: "Драконья Свинка",
    rarity: "legendary",
    price: 2500,
    image: "🐉🐷",
  },
];

const RARITY_COLORS = {
  common: "bg-gray-600",
  rare: "bg-blue-600",
  epic: "bg-purple-600",
  legendary: "bg-yellow-600",
};

interface CaseOpenerProps {
  balance: number;
  onOpenCase: (cost: number) => void;
}

export default function CaseOpener({ balance, onOpenCase }: CaseOpenerProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  const handleOpenCase = (caseItem: CaseItem) => {
    if (balance < caseItem.price) return;

    setIsOpening(true);
    setSelectedCase(caseItem);

    setTimeout(() => {
      onOpenCase(caseItem.price);
      setIsOpening(false);
      setSelectedCase(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-montserrat font-bold text-white mb-2">
          Выбери свой кейс
        </h2>
        <p className="text-gray-400 font-roboto">
          Каждый кейс содержит уникальных свинок разной редкости
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CASE_ITEMS.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="bg-gray-900/50 border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
          >
            <div className="p-6 text-center">
              <div className="text-6xl mb-4 animate-pulse">
                {caseItem.image}
              </div>

              <h3 className="font-montserrat font-semibold text-white mb-2">
                {caseItem.name}
              </h3>

              <Badge
                className={`${RARITY_COLORS[caseItem.rarity]} text-white mb-4`}
              >
                {caseItem.rarity.toUpperCase()}
              </Badge>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon name="Coins" className="text-yellow-500" size={20} />
                <span className="text-xl font-montserrat font-bold text-white">
                  {caseItem.price}
                </span>
              </div>

              <Button
                onClick={() => handleOpenCase(caseItem)}
                disabled={balance < caseItem.price || isOpening}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-montserrat font-semibold"
              >
                {balance < caseItem.price
                  ? "Недостаточно средств"
                  : "Открыть кейс"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {isOpening && selectedCase && (
        <Card className="bg-gray-900/90 border-purple-500 p-8 text-center">
          <div className="animate-spin text-8xl mb-4">{selectedCase.image}</div>
          <h3 className="text-2xl font-montserrat font-bold text-white mb-2">
            Открываем кейс...
          </h3>
          <p className="text-gray-400 font-roboto">
            Ждем результат драки со свиньями!
          </p>
        </Card>
      )}
    </div>
  );
}
