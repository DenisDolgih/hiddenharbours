interface IProps {
    text: string | null
    visible: boolean
}


/**
 * Renders a Chips component.
 *
 * @param {IProps} text - The children to be rendered inside the component.
 * @return {JSX.Element} The rendered Chips component.
 */
export function Chips({text, visible}: IProps): JSX.Element {
    const classes = visible ? "chips" : "chips hidden"
    return (
        <div className={classes}>{text}</div>
    )
}