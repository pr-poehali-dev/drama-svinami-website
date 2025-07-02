import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface BalanceProps {
  balance: number;
  onTopUp: () => void;
}

export default function Balance({ balance, onTopUp }: BalanceProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Icon
              name="Coins"
              className="text-yellow-500 animate-pulse-gold"
              size={32}
            />
            <span className="absolute -top-1 -right-1 text-xs">🐷</span>
          </div>
          <div>
            <p className="text-gray-400 text-sm font-roboto">Баланс</p>
            <p className="text-2xl font-montserrat font-bold text-white">
              {balance.toLocaleString()} Big Coins
            </p>
          </div>
        </div>

        <Button
          onClick={onTopUp}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-montserrat font-semibold"
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Пополнить
        </Button>
      </div>
    </Card>
  );
}
