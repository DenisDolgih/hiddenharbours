import { useState } from "react";
import { Link } from "react-router-dom"
import { Chips } from "./Chips";

interface IProps {
    toggleToolbar: () => void
    currentURL: string,
    contentEditable: boolean
}


/**
 * Renders the navigation component.
 *
 * @return {JSX.Element} The rendered navigation component.
 */
export default function Nav({ toggleToolbar, currentURL, contentEditable }: IProps): JSX.Element {
    const [chipsText, setChipsText] = useState('');
    const [chipsVisible, setChipsVisible] = useState(false);

    /**
     * Fetches a shortened URL from an external API.
     */
    const getLink = () => {
        // Construct the API URL by combining the base URL and the current URL
        const apiUrl = `https://api.shrtco.de/v2/shorten?url=${import.meta.env.VITE_DOMAIN_NAME}${currentURL}`;

        // Fetch the data from the API
        fetch(apiUrl)
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    setChipsText(`Link to this article : ${data?.result?.full_short_link} copied to clipboard`);
                    // copy data?.result?.full_short_link to memory buffer
                    navigator.clipboard.writeText(data?.result?.full_short_link).then(() => {
                        setChipsVisible(true);
                        setTimeout(() => {
                            setChipsVisible(false);
                        }, 5000);
                    });
                });
    }

    return (
        <nav>
            <ul>
                <li><Link to="/about" className="link">About</Link></li>
                <li><Link to="/" className="link">New Article</Link></li>
                {!contentEditable && <li><a onClick={toggleToolbar} className="link">Edit</a></li>}
                <li><a onClick={getLink} className="link">Get link</a></li>
            </ul>
            <Chips text={chipsText} visible={chipsVisible} />
        </nav>
    )
}