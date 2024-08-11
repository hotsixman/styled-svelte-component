//@ts-nocheck
export type PropsTypeDefinedStyledComponent<Props extends Record<string, unknown>> = (new (args: { target: any; props?: Props & Record<string, unknown>}) => ATypedSvelteComponent) & {styledComponentData: StyledComponentData<Props, undefined>};
export type PropsTypeDefinedStyledComponentWithCommonStyle<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown>> = (new (args: { target: any; props?: Props & Record<string, unknown>}) => ATypedSvelteComponent) & {common: PropsTypeDefinedStyledComponent<CommonProps>} & {styledComponentData: StyledComponentData<Props, CommonProps>};
export type StyleGenerator<Props extends Record<string, any>> = (props: Props & Record<string, unknown>) => string

export type StyledComponentData<Props extends Record<string, unknown>, CommonProps extends Record<string, unknown> | undefined> = {
    tagName: string;
    generateStyle: StyleGenerator<Props>,
    generateCommonStyle: CommonProps extends undefined ? undefined : StyleGenerator<CommonProps>
}