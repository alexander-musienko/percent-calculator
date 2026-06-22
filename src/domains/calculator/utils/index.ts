type TValues = {
  a: string | undefined;
  b: string | undefined;
};

export const calculatePercentOfANumber = (values: TValues, toFixedNum?: number) => {
  if (values?.b && values?.a) {
    const [fullNumber, percent] = [+values.b, +values.a];
    const percentOfNumberResult = (fullNumber * percent) / 100;
    return +percentOfNumberResult.toFixed(toFixedNum || 0);
  } else {
    return 0;
  }
};

export const calculatePercentPlusNumber = (values: TValues, toFixedNum?: number) => {
  if (values?.a && values?.b) {
    const [fullNumber, percent] = [+values.a, +values.b];
    const onePercentNumber = fullNumber / 100;
    const numberOfPercent = onePercentNumber * percent;
    const percentPlusNumberResult = numberOfPercent + fullNumber;
    return +percentPlusNumberResult.toFixed(toFixedNum || 0);
  } else {
    return 0;
  }
};

export const subtractPercentFromNumber = (values: TValues, toFixedNum?: number) => {
  if (values?.a && values?.b) {
    const [fullNumber, percent] = [+values.b, +values.a];
    const onePercentNumber = fullNumber / 100;
    const numberOfPercent = onePercentNumber * percent;
    const subtractedNumberResult = fullNumber - numberOfPercent;
    return +subtractedNumberResult.toFixed(toFixedNum || 0);
  } else {
    return 1;
  }
};

export const calculateDifferenceInPercentage = (values: TValues, toFixedNum?: number) => {
  if (values?.a && values.b) {
    const [fullNumber, secondFullNumber] = [+values.a, +values.b];
    const max = Math.max(fullNumber, secondFullNumber);
    const min = Math.min(fullNumber, secondFullNumber);

    const differenceInPercentage = (max / min - 1) * 100;

    return +differenceInPercentage.toFixed(toFixedNum || 0);
  } else {
    return 0;
  }
};
