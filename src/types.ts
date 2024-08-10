//@ts-nocheck
export type PropsTypeDefinedStyledComponent<Props extends Record<string, unknown>> = new (args: { target: any; props?: Props & Record<string, unknown>}) => ATypedSvelteComponent;