import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { FC } from "react";

type TCardInstanceProps = {
  headerText: string;

  children: React.ReactNode;
};

export const CardLayout: FC<TCardInstanceProps> = ({ headerText, children }) => {
  return (
    <Card>
      <CardHeader className="flex">
        <h1 className="text-xl font-bold">{headerText}</h1>
      </CardHeader>
      <CardBody className="flex gap-4 flex-row items-center">{children}</CardBody>
    </Card>
  );
};
