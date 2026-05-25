"use client";

import { useReducer } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { OrderScreen } from "@/components/OrderScreen";
import { PaymentScreen } from "@/components/PaymentScreen";
import { GameScreen } from "@/components/GameScreen";
import { ResultScreen } from "@/components/ResultScreen";

type ScreenState =
  | { name: "order" }
  | { name: "payment" }
  | { name: "game" }
  | { name: "result"; freezePercent: number; onTargetPercent: number };

type Action =
  | { type: "PAY_NOW" }
  | { type: "PAYMENT_DONE" }
  | { type: "GAME_DONE"; freezePercent: number; onTargetPercent: number }
  | { type: "RETRY" };

function reducer(state: ScreenState, action: Action): ScreenState {
  switch (action.type) {
    case "PAY_NOW":
      if (state.name !== "order") return state;
      return { name: "payment" };
    case "PAYMENT_DONE":
      if (state.name !== "payment") return state;
      return { name: "game" };
    case "GAME_DONE":
      if (state.name !== "game") return state;
      return {
        name: "result",
        freezePercent: action.freezePercent,
        onTargetPercent: action.onTargetPercent,
      };
    case "RETRY":
      return { name: "order" };
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { name: "order" });

  return (
    <PhoneFrame>
      {state.name === "order" && (
        <OrderScreen onPlaceOrder={() => dispatch({ type: "PAY_NOW" })} />
      )}
      {state.name === "payment" && (
        <PaymentScreen onComplete={() => dispatch({ type: "PAYMENT_DONE" })} />
      )}
      {state.name === "game" && (
        <GameScreen
          onComplete={(freezePercent, onTargetPercent) =>
            dispatch({ type: "GAME_DONE", freezePercent, onTargetPercent })
          }
        />
      )}
      {state.name === "result" && (
        <ResultScreen
          freezePercent={state.freezePercent}
          onTargetPercent={state.onTargetPercent}
          onRetry={() => dispatch({ type: "RETRY" })}
        />
      )}
    </PhoneFrame>
  );
}
