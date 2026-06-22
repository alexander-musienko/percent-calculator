import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import {
  calculateDifferenceInPercentage,
  calculatePercentOfANumber,
  calculatePercentPlusNumber,
  subtractPercentFromNumber,
} from "../../utils";
import { CardLayout } from "./ui/CardInstance";
import { CardInput, type TCardInputProps } from "./ui/CardInput";

export interface IBaseFields {
  percent?: string;
  fullNumber?: string;
}

export interface INumberOfNumberPercent extends IBaseFields {
  partNumber?: string;
}

export interface IDifferenceInPercentage extends IBaseFields {
  secondFullNumber?: string;
}

const decimalItems = Array.from({ length: 5 }, (_, index) => ({
  label: String(index),
  key: index,
}));

const INPUT_CONFIGS: Record<string, TCardInputProps> = {
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

  const handleNumberOfDecimalPlaces = (e: ChangeEvent<HTMLSelectElement>) => {
    setNumberOfDecimalPlaces(+e.target.value);
  };

  return (
    <main className="relative container mx-auto max-w-7xl z-10 px-6 pb-12 flex-grow">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CardLayout headerText="Вычесть процент от числа (-)">
          <CardInput {...INPUT_CONFIGS.percentMinusNumber} />
        </CardLayout>

        <CardLayout headerText="Процент от числа">
          <CardInput {...INPUT_CONFIGS.percentOfNumber} />
        </CardLayout>

        <CardLayout headerText="Прибавить процент к числу (+)">
          <CardInput {...INPUT_CONFIGS.percentPlusNumber} />
        </CardLayout>

        <CardLayout headerText="Разница в процентах между числами (Δ%)">
          <CardInput {...INPUT_CONFIGS.percentDelta} />
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
