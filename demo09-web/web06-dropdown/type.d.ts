interface Option {
    id: string,
    value: string | number,
}
interface OptionGroup {
    id: string,
    label: string,
    options: Option[]
}