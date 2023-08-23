interface IProps{
    toggleToolbar: () => void
    currentURL: string,
    contentEditable: boolean
}


/**
 * Renders the navigation component.
 *
 * @return {JSX.Element} The rendered navigation component.
 */
export default function Nav({ toggleToolbar, currentURL, contentEditable }: IProps) {
    // get shortened url from external api
    const getLink = () => {
        fetch(`https://api.shrtco.de/v2/shorten?url=${import.meta.env.VITE_DOMAIN_NAME}${currentURL}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }
    return (
        <nav>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/">New Article</a></li>
                {!contentEditable && <li><a href="#" onClick={ toggleToolbar }>Edit</a></li>}
                <li><a href="#" onClick={getLink}>Get link</a></li>
            </ul>
        </nav>
    )
}