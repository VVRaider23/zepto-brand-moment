"use client";

import { useReducer } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { OrderScreen } from "@/components/OrderScreen";
import { IntroScreen } from "@/components/IntroScreen";
import { GameScreen } from "@/components/GameScreen";
import { ResultScreen } from "@/components/ResultScreen";

type ScreenState =
  | { name: "order" }
  | { name: "intro" }
  | { name: "game" }
  | { name: "result"; freezePercent: number; onTargetPercent: number };

type Action =
  | { type: "PLACE_ORDER" }
  | { type: "INTRO_DONE" }
  | { type: "GAME_DONE"; freezePercent: number; onTargetPercent: number }
  | { type: "RETRY" };

function reducer(state: ScreenState, action: Action): ScreenState {
  switch (action.type) {
    case "PLACE_ORDER":
      if (state.name !== "order") return state;
      return { name: "intro" };
    case "INTRO_DONE":
      if (state.name !== "intro") return state;
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
        <OrderScreen onPlaceOrder={() => dispatch({ type: "PLACE_ORDER" })} />
      )}
      {state.name === "intro" && (
        <IntroScreen onComplete={() => dispatch({ type: "INTRO_DONE" })} />
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
