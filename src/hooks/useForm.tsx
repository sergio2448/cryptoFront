import { useState } from "react";

const useForm = <T extends Object>(initState: T) => {
  const [state, setState] = useState(initState);

  const onChange = (value: string | number, field: keyof T) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const onValueChange = (
    value1: string | number,
    value2: string | number,
    fiel: keyof T,
    field: keyof T
  ) => {
    setState({
      ...state,
      [fiel]: value1,
      [field]: value2,
    });
  };

  const onValueChanged = (
    value1: string | number,
    value2: string | number,
    value3: string | number,
    fiel: keyof T,
    field: keyof T,
    fieldd: keyof T
  ) => {
    setState({
      ...state,
      [fiel]: value1,
      [field]: value2,
      [fieldd]: value3,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
    onValueChange,
    onValueChanged,
  };
};

export default useForm;
