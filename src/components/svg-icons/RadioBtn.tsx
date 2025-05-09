import * as React from 'react';
import type { SVGProps } from 'react';
const SvgRadioBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill={props.fill}
    viewBox="0 0 16 16"
    {...props}
  >
    <circle cx={8} cy={8} r={7} stroke="#C2C2C2" strokeWidth={2} />
  </svg>
);
export default SvgRadioBtn;
