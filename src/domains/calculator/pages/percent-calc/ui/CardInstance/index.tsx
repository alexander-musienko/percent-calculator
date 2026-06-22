import { Button, Card, CardBody, CardHeader, input } from "@nextui-org/react";
import { FC } from "react";
import { amountOfInputsAtom, type TAmountOfInputsState } from "../../store";
import { useAtom } from "jotai";
import type { EInputType } from "../../types";
import { LS_KEYS } from "../../constants/local-storage";

type TCardInstanceProps = {
  headerText: string;
  inputKey?: EInputType;
  children: React.ReactNode;
};

const syncWithLS = (state: TAmountOfInputsState) => {
  localStorage.setItem(LS_KEYS.INPUTS_AMOUNT, JSON.stringify(state));
};

export const CardLayout: FC<TCardInstanceProps> = ({ headerText, children, inputKey }) => {
  const [_, setAmountOfInputs] = useAtom(amountOfInputsAtom);

  const addInput = () => {
    if (inputKey) {
      setAmountOfInputs((prev) => {
        const newState = { ...prev, [inputKey]: +prev[inputKey] + 1 };
        syncWithLS(newState);
        return newState;
      });
    }
  };

  const removeInput = () => {
    if (inputKey) {
      setAmountOfInputs((prev) => {
        const newState = { ...prev, [inputKey]: +prev[inputKey] - 1 };

        if (newState[inputKey] > 0) {
          syncWithLS(newState);
          return newState;
        }

        return prev;
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h1 className="text-xl font-bold">{headerText}</h1>
        <div className="flex justify-center items-center gap-2">
          <Button
            onClick={addInput}
            className="w-[32px] h-[32px] font-bold min-w-0 p-0 m-0 flex-grow-0"
          >
            +
          </Button>
          <Button
            onClick={removeInput}
            className="w-[32px] h-[32px] font-bold min-w-0 p-0 m-0 flex-grow-0"
          >
            -
          </Button>
        </div>
      </CardHeader>
      <CardBody className="flex gap-4 flex-column justify-start items-stretch">{children}</CardBody>
    </Card>
  );
};
