//@ts-nocheck
export type PropsTypeDefinedStyledComponent<Props extends Record<string, unknown>> = new (args: { target: any; props?: Props & Record<string, unknown>}) => ATypedSvelteComponent;
export type PropsTypeDefinedStyledComponentWithCommonStyle<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>> = (new (args: { target: any; props?: Props & Record<string, unknown>}) => ATypedSvelteComponent) & {common: PropsTypeDefinedStyledComponent<CommonProps>};
export type StyleGenerator<Props extends Record<string, any>> = (props: Props & Record<string, unknown>) => string