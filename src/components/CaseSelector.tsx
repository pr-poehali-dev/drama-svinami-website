import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface CaseData {
  id: string;
  name: string;
  price: number;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  description: string;
}

const cases: CaseData[] = [
  {
    id: "1",
    name: "Свинский Стартер",
    price: 100,
    emoji: "🐷",
    rarity: "common",
    description: "Базовый кейс для новичков",
  },
  {
    id: "2",
    name: "Золотая Свинка",
    price: 500,
    emoji: "🥇",
    rarity: "rare",
    description: "Шанс на редкие призы!",
  },
  {
    id: "3",
    name: "Королевская Драма",
    price: 1000,
    emoji: "👑",
    rarity: "epic",
    description: "Эпические награды ждут",
  },
  {
    id: "4",
    name: "Легендарный Хряк",
    price: 2500,
    emoji: "🔥",
    rarity: "legendary",
    description: "Максимальные призы!",
  },
];

const rarityColors = {
  common: "bg-gray-600",
  rare: "bg-blue-600",
  epic: "bg-purple-600",
  legendary: "bg-orange-600",
};

interface CaseSelectorProps {
  balance: number;
  onOpenCase: (caseData: CaseData) => void;
}

export default function CaseSelector({
  balance,
  onOpenCase,
}: CaseSelectorProps) {
  const canAfford = (price: number) => balance >= price;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-montserrat font-bold text-white mb-2">
          Выбери свой кейс
        </h2>
        <p className="text-gray-400">Каждый кейс содержит уникальные призы</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cases.map((caseItem) => (
          <Card
            key={caseItem.id}
            className="bg-gray-900/70 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
          >
            <div className="p-6 text-center space-y-4">
              <div className="relative">
                <div className="text-6xl mb-2">{caseItem.emoji}</div>
                <Badge
                  className={`${rarityColors[caseItem.rarity]} text-white font-montserrat`}
                >
                  {caseItem.rarity.toUpperCase()}
                </Badge>
              </div>

              <div>
                <h3 className="font-montserrat font-bold text-lg text-white">
                  {caseItem.name}
                </h3>
                <p className="text-gray-400 text-sm">{caseItem.description}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-yellow-500">
                <Icon name="Coins" size={20} />
                <span className="font-montserrat font-bold text-lg">
                  {caseItem.price.toLocaleString()}
                </span>
              </div>

              <Button
                onClick={() => onOpenCase(caseItem)}
                disabled={!canAfford(caseItem.price)}
                className={`w-full font-montserrat font-semibold ${
                  canAfford(caseItem.price)
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                {canAfford(caseItem.price) ? (
                  <>
                    <Icon name="Gift" size={16} className="mr-2" />
                    Открыть
                  </>
                ) : (
                  <>
                    <Icon name="Lock" size={16} className="mr-2" />
                    Недостаточно монет
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
