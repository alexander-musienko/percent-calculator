import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  calculateDifferenceInPercentage,
  calculatePercentOfANumber,
  calculatePercentPlusNumber,
  subtractPercentFromNumber,
} from "../../utils";
import { CardLayout } from "./ui/CardInstance";
import { CardInput, type TCardInputProps } from "./ui/CardInput";
import { useAtom } from "jotai";
import { amountOfInputsAtom, type TAmountOfInputsState } from "./store";
import { EInputType } from "./types";

const decimalItems = Array.from({ length: 5 }, (_, index) => ({
  label: String(index),
  key: index,
}));

type TRenderInputFromAmountArgs = {
  props: TCardInputProps;
  amount: number;
};

const renderInputFromAmount = ({ props, amount }: TRenderInputFromAmountArgs) => {
  return Array.from({ length: amount }).map((_, i) => (
    <CardInput
      key={`${props.config.leftInput.label + props.config.rightInput.label + i}`}
      {...props}
    />
  ));
};

const INPUT_PROPS: Record<string, TCardInputProps> = {
  percentMinusNumber: {
    config: {
      leftInput: {
        label: "Процент %",
        placeholder: "Процент",
      },
      rightInput: {
        label: "Числа",
        placeholder: "Число",
      },
      dividerLabel: "из",
    },
    calcFn: subtractPercentFromNumber,
  },

  percentOfNumber: {
    config: {
      leftInput: {
        label: "Процент %",
        placeholder: "Процент",
      },
      rightInput: {
        label: "Числа",
        placeholder: "Число",
      },
      dividerLabel: "от",
    },
    calcFn: calculatePercentOfANumber,
  },

  percentPlusNumber: {
    config: {
      leftInput: {
        label: "Процент %",
        placeholder: "Процент",
      },
      rightInput: {
        label: "Числу",
        placeholder: "Число",
      },
      dividerLabel: "к",
    },
    calcFn: calculatePercentPlusNumber,
  },

  percentDelta: {
    config: {
      leftInput: {
        label: "Число 1",
        placeholder: "Число",
      },
      rightInput: {
        label: "Число 2",
        placeholder: "Число",
      },
      dividerLabel: "с",
    },
    calcFn: calculateDifferenceInPercentage,
  },
};

export const PercentCalc = () => {
  const [numberOfDecimalPlaces, setNumberOfDecimalPlaces] = useState(0);
  const [amountOfInputs] = useAtom(amountOfInputsAtom);

  const handleNumberOfDecimalPlaces = (e: ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDecimalPlaces(+e.target.value);
  };

  return (
    <main className="relative container mx-auto max-w-7xl z-10 px-6 pb-12 flex-grow">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CardLayout
          inputKey={EInputType.percentMinusNumber}
          headerText="Вычесть процент от числа (-)"
        >
          {renderInputFromAmount({
            props: INPUT_PROPS.percentMinusNumber,
            amount: amountOfInputs.percentMinusNumber,
          })}
        </CardLayout>

        <CardLayout inputKey={EInputType.percentOfNumber} headerText="Процент от числа">
          {renderInputFromAmount({
            props: INPUT_PROPS.percentOfNumber,
            amount: amountOfInputs.percentOfNumber,
          })}
        </CardLayout>

        <CardLayout
          inputKey={EInputType.percentPlusNumber}
          headerText="Прибавить процент к числу (+)"
        >
          {renderInputFromAmount({
            props: INPUT_PROPS.percentPlusNumber,
            amount: amountOfInputs.percentPlusNumber,
          })}
        </CardLayout>

        <CardLayout
          inputKey={EInputType.percentDelta}
          headerText="Разница в процентах между числами (Δ%)"
        >
          {renderInputFromAmount({
            props: INPUT_PROPS.percentDelta,
            amount: amountOfInputs.percentDelta,
          })}
        </CardLayout>

        <Select onChange={handleNumberOfDecimalPlaces} label="Знаков после запятой">
          {decimalItems.map((decimalItem) => (
            <SelectItem key={decimalItem.key} value={decimalItem.key}>
              {decimalItem.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </main>
  );
};
