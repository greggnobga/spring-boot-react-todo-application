import { ChangeEvent, useState } from 'react';

const useValidate = (validateValue: any) => {
    /** declare local state. */
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setTouched] = useState<boolean>(false);

    /** received external function to validate input. */
    const valueIsValid = validateValue(enteredValue);

    /** check if input is valid and element is touched. */
    const hasError = !valueIsValid && isTouched;

    /** bind to onchange attribute and capture input. */
    const valueChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.target) {
            setEnteredValue(event.target.value);
        }
    };

    /** bind to onblur attribute and change touched state accordingly. */
    const inputBlurHandler = () => {
        setTouched(true);
    };

    /** reset value to default. */
    const resetHandler = () => {
        setEnteredValue('');
        setTouched(false);
    };

    /** expose local state and function outside. */
    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        resetHandler,
    };
};

export default useValidate;
