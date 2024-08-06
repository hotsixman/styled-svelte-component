export interface StyledComponentEvent {
    name: string;
    passive?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
    stopImmediatePropagation?: boolean;
    capture?: boolean;
    once?: boolean;
    self?: boolean;
    trusted?: boolean;
}
export declare function createSSC(tag: keyof HTMLElementTagNameMap, style: string, events?: StyledComponentEvent[]): {
    new (options: {
        target: any;
        props?: any;
    }): {};
};
export { createSSC as styledSvelteComponent };
export default createSSC;
//# sourceMappingURL=index.d.ts.map