import { Input } from "@nextui-org/react";
import { copyToClipboard } from "../../../../../../shared/utils/clipboard";
import { toast } from "react-toastify";
import { Copy } from "../../../../../../assets/icons/Copy";
import { Count } from "../../../../../../shared/components/Count";
import { giveMeSomeMotivation } from "../../../../../../shared/utils/auido-motivation";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";

type TFormData = {
  operand_1: string;
  operand_2: string;
};

type TInputConfig = {
  label: string;
  placeholder: string;
};

export type TCardInputProps = {
  config: {
    leftInput: TInputConfig;
    rightInput: TInputConfig;
    unit?: string;
    dividerLabel: string;
  };
  calcFn: (values: { a: string | undefined; b: string | undefined }) => number;
};

const copyOnClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
  const text = e.currentTarget.innerText;
  toast("Успешно скопировано", { icon: Copy });
  copyToClipboard(text);
  window.dumbMode ? giveMeSomeMotivation() : null;
};

export const CardInput: FC<TCardInputProps> = ({ config, calcFn }) => {
  const { register, watch } = useForm<TFormData>();
  const [result, setResult] = useState(0);

  useEffect(() => {
    const subscription = watch(({ operand_1, operand_2 }) => {
      setResult(calcFn({ a: operand_1, b: operand_2 }));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <div className="flex flex-col gap-2 items-center sm:flex-row sm:gap-4">
        {" "}
        <Input
          type="number"
          placeholder={config.leftInput.placeholder}
          label={config.leftInput.label}
          {...register("operand_1")}
        />
        <p>{config.dividerLabel}</p>
        <Input
          type="number"
          placeholder={config.rightInput.placeholder}
          label={config.rightInput.label}
          {...register("operand_2")}
        />
      </div>
      <div className="flex gap-2 flex-row items-center flex-grow justify-between">
        <p>=</p>
        <p onClick={copyOnClick} className="text-xl font-bold cursor-pointer">
          <Count end={result} />
          {config?.unit}
        </p>
      </div>
    </>
  );
};
