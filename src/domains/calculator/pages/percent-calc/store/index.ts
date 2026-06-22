import { atom } from "jotai";
import { EInputType } from "../types";
import { LS_KEYS } from "../constants/local-storage";

export type TAmountOfInputsState = {
  percentMinusNumber: number;
  percentOfNumber: number;
  percentPlusNumber: number;
  percentDelta: number;
};

const getInitialState = () => {
  const savedAmounts = localStorage.getItem(LS_KEYS.INPUTS_AMOUNT);
  const parsedSavedAmounts = (
    savedAmounts ? JSON.parse(savedAmounts) : null
  ) as TAmountOfInputsState;

  if (parsedSavedAmounts) {
    return parsedSavedAmounts;
  }

  return {
    [EInputType.percentMinusNumber]: 1,
    [EInputType.percentOfNumber]: 1,
    [EInputType.percentPlusNumber]: 1,
    [EInputType.percentDelta]: 1,
  };
};

export const amountOfInputsAtom = atom<TAmountOfInputsState>(getInitialState());
