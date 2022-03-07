import * as React from 'react';
import { Flex } from '@sipher.dev/sipher-ui';

import MultiPickerMixin from './MultiPickerMixin';
import MultiPickerProps from './MultiPickerProps';

export interface IMultiPickerProp {
  getValue: () => any;
}

const MultiPicker = (props: IMultiPickerProp & MultiPickerProps) => {
  const { rootNativeProps, children, style } = props;
  const selectedValue = props.getValue();
  const colElements = React.Children.map(children, (col: any, i) => {
    return React.cloneElement(col, {
      selectedValue: selectedValue[i],
      onValueChange: (...args) => props.onValueChange!(i, ...args),
      onScrollChange: props.onScrollChange && ((...args) => props.onScrollChange!(i, ...args)),
    });
  });
  return (
    <Flex align="center" w="full" h="full" {...rootNativeProps} style={style}>
      {colElements}
    </Flex>
  );
};

export default MultiPickerMixin(MultiPicker);
