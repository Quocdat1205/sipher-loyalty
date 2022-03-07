export interface IPickerCol {
  key?: string;
  props?: any;
}

interface IMultiPickerProps {
  selectedValue?: any[];
  rootNativeProps?: any;
  onValueChange?: (v?: any, i?: number) => void;
  children?: any;
  style?: any;
  onScrollChange?: (v?: any, i?: number) => void;
}

export default IMultiPickerProps;
