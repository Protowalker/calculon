import { useCallback, useState } from "react";

/**
 * For values that have a valid and invalid state, but an inbetween state needs to be accessed in the interim (i.e. a phone number input)
 * @param validator - The function that determines if a value is valid
 * @param defaultValue - The starting value or a callback defining it
 * @returns [rawValue, updateValue(T), validValue]
 */

type ErrorMessage = [true] | [false, string | undefined];
export type Validator<T> = (val: T) => ErrorMessage;

export function useValidatedValue<T>(
  validator: Validator<T>,
  defaultValue: T | (() => T),
  onValid?: (val: T) => void
): [T, (val: T) => void, T, string | undefined] {
  const [rawValue, setRawValue] = useState(defaultValue);
  const [validValue, setValidValue] = useState(defaultValue);
  const [error, setError] = useState<string | undefined>(undefined);

  const updateValue = useCallback(
    (val: T) => {
      setRawValue(val);
      const validationResult = validator(val);
      if (validationResult[0] === true) {
        setValidValue(val);
        onValid?.(val);
      } else {
        setError(validationResult[1]);
      }
    },
    [onValid, validator]
  );
  return [rawValue, updateValue, validValue, error];
}
