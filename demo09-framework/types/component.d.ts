
// export type Component<Props = null, Meta = any> = Props extends null ? {

// } : {

// }
export type ComponentCSSStyle = CSSStyleSheet | HTMLStyleElement;
export type ComponentMeta = {}
// export type ComponentProps = DOMProps
export type ComponentProps = ComponentMeta

type Component<Props> = {
    meta?: ComponentMeta
    props?: ComponentProps
    styles?: ComponentCSSStyle
}

type MyProps = {}
