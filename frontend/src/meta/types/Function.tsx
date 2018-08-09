import { ButtonProps, TextAreaProps } from 'semantic-ui-react';

import { FormEvent } from '../../../node_modules/@types/react';

export type ButtonClick = (e: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => void;

export type OnTextAreaChange = ((
  event: FormEvent<HTMLTextAreaElement>,
  data: TextAreaProps,
) => void);

export type RefFunction =
  | string
  | ((instance: HTMLDivElement | null) => any)
  | React.RefObject<HTMLDivElement>
  | undefined;

export type SpanClick = (e: React.MouseEvent<HTMLSpanElement>) => void;

export type DivClick = (e: React.MouseEvent<HTMLDivElement>) => void;

export type ElementClick = (e: React.MouseEvent<HTMLAnchorElement>) => void;
