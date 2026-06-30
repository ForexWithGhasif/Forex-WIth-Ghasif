import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  iconLeft?: React.ReactNode;
  /** Trailing slot — e.g. a submit Button for newsletter signup. */
  trailing?: React.ReactNode;
  inputStyle?: React.CSSProperties;
}

/** Styled text input with gold focus ring and optional trailing action. */
export function Input(props: InputProps): JSX.Element;
