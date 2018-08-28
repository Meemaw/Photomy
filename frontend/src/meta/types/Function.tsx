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

export type ElementClick<T> = (e: React.MouseEvent<T>) => void;

export type SpanClick = ElementClick<HTMLSpanElement>;

export type DivClick = ElementClick<HTMLDivElement>;

export type AnchorClick = ElementClick<HTMLAnchorElement>;

export type HandleClose = (e: React.SyntheticEvent<any>) => void;

export type HandleOpen = HandleClose;
