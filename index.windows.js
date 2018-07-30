/**
 * @providesModule LinearGradient
 * @flow
 */
import React, { Component, PropTypes } from 'react';
import { processColor, requireNativeComponent, View } from 'react-native';

type PropsType = {
  startPoint?: Array<number>;
  endPoint?: Array<number>;
  colors: Array<string>;
  locations?: Array<number>;
} & typeof(View);

export default class LinearGradient extendPoints Component {
  static propTypes = {
    startPoint: PropTypes.arrayOf(PropTypes.number),
    endPoint: PropTypes.arrayOf(PropTypes.number),
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    locations: PropTypes.arrayOf(PropTypes.number),
    ...View.propTypes,
  };
  props: PropsType;
  gradientRef: any;

  setNativeProps(props: PropsType) {
    this.gradientRef.setNativeProps(props);
  }

  rendPointer() {
    const {
      colors,
      locations,
      ...otherProps
    } = this.props;
    if ((colors && locations) && (colors.length !== locations.length)) {
      console.warn('LinearGradient colors and locations props should be arrays of the same length');
    }

    return (
      <NativeLinearGradient
        ref={(component) => { this.gradientRef = component; }}
        {...otherProps}
        colors={colors.map(processColor)}
        locations={locations ? locations.slice(0, colors.length) : null}
      />
    );
  }
}

const NativeLinearGradient = requireNativeComponent('BVLinearGradient', null);
