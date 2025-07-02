import { useState } from "react";
import { toast } from "sonner";
import Balance from "@/components/Balance";
import CaseSelector from "@/components/CaseSelector";
import Icon from "@/components/ui/icon";

interface CaseData {
  id: string;
  name: string;
  price: number;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  description: string;
}

const Index = () => {
  const [balance, setBalance] = useState(0);

  const handleTopUp = () => {
    toast.info("Пополнение через ЮМани скоро будет доступно!", {
      description: "Следите за обновлениями в нашем Telegram-канале",
    });
  };

  const handleOpenCase = (caseData: CaseData) => {
    if (balance >= caseData.price) {
      setBalance((prev) => prev - caseData.price);
      toast.success(`Кейс "${caseData.name}" открыт! 🎉`, {
        description: "Система призов в разработке",
      });
    } else {
      toast.error("Недостаточно Big Coins!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="relative px-6 py-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon
                name="Drama"
                fallback="Zap"
                size={48}
                className="text-purple-500"
              />
              <h1 className="text-5xl font-montserrat font-bold text-white">
                Draka so sviniami
              </h1>
              <span className="text-4xl">🐷</span>
            </div>
            <p className="text-xl text-gray-300 font-roboto">
              Открывай кейсы, получай призы, наслаждайся драмой!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-12 space-y-8">
        {/* Balance Section */}
        <Balance balance={balance} onTopUp={handleTopUp} />

        {/* Case Selector */}
        <CaseSelector balance={balance} onOpenCase={handleOpenCase} />

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm">
            Валюта: Big Coins • Пополнение через ЮМани • Драма гарантирована 🎭
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
