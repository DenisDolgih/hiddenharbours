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
 * @param {function} toggleToolbar - Function to toggle the toolbar.
 * @param {string} currentURL - The current URL.
 * @param {boolean} contentEditable - Indicates if the content is editable.
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
                        // Show the chips
                        setChipsVisible(true);
                        // Hide the chips after 5 seconds
                        setTimeout(() => {
                            setChipsVisible(false);
                        }, 5000);
                    });
                });
    }

    // About article is encoded in this string
    const about = "DwCwjABAxgNghgZwQXgEQEcYFo4wJYDmAdllAKZEAuZATqgHzAIAOcR08SamWCeAXmSzwaBMgwCCAIwD2AV0oQA8nJoQAqkTzo5ZCAHUyUvtQBcBkLT0BJIgDMZNALZxKeGewAyeAG5kEEHjs6gBKngjAAPQsbIyR4IzMjFI0cUnA6THssIgoGNh8gsJwouL0hjBQMk56lDIQTgCegUREMj6uvnoA7kYmZAA0EN2WNLWWELJyRAAmMP4BY7hOEDJ2LQ7OnR4NZGSUAZQTVURQeAh6JwiUNHBBB6vrcJM0Mt0XaqGeAHQQABJWIbWADkfggIBKRAWZBmECOemYb1ojwgNDwUBAcLIAA9FCdqFQIGxYRQqjMYYFFN08EcgnCJn4aM07HAUuiUfI1L0pESZjMxkh-L8ACogc4QabMMbkclUClwZhSmRwDHgxAQAhddhoi5w+rPZjwSibFZHVzgmQwGaHCaIgluXAo+EQChuMbDRxW4EBADWbW68xmYmGYvm0A8lDuWiIBAgbVpMYajnGbCJEGuaMTa2gENuUGoNAQ3yiWTSiWSqSi6XSKTLoAATBxctxsLhCCRyHK6Iwsk2uPleAIhCIxJIICE4DN0Y6AMIecjMSgl1hEOIgevl4C1qub3s5fs8QrDkqj+i2NNTzWRmBE4PkuxBClSZozVysxD+IYfRkIIbE8NOIaOIQK+kbpjccj5qon7DGQoK1HAPoUBeeB2HYViEq8ChkL8ACyzTcv0gQBM81DXHANSEnU9KXEsbg+DSzT-kEYhEHIjH0uaZA1KUAQjMhvQQDo-huDszonH4VDuEQjptM4ATZkEJrbOw1yOHAYi-LY1xkJOKJjDAjQsas7A3JONLSY6NRHDI1ooqB74XFg-JauGcqEi4MliJRlBAvBLpOCkKoUs6fCAfgZyUM02ZfEWy6xDuGQVnWmQrn2eSHkOxSlAwACiKqYiUbiwIM4GOI0QyOBAzB4GQ5AokpjguKJ2r+Hg5J8TSYrsM8Xy-LljIEY4Mxfq6pKlf+rC3AQtzMJi4qkrZFJ0s8FzCacejZhiJQqgWNrmg+ijOvgTg0ipClPC8bwfN6GhhJMJQimKASnVoLj4NcRKKq8BU5rg8wxv4NHDHAzTWPSQQ+kSUyKA5ZXTaVUgwKomaxsdj6TPsvTIY1WwtUSsy8vyCzFtEK4pcliU1pWkTpOu6Utjg+DEKQY3dkwaX7hlBRZSOZQSBoWg-no+hdXSADKNwsREZMJfEG5JVuNPVj2nOcNzg5FHzkiKA+haKAQ8AbUMNINIQICKBc3GBOFcByHwSMpoozxVOF+x6EV6JhlUchWi62LnFSYumccHgPlCF1pn1EAAEIKBAIJgrmEcXLCzqIr0ajZmiqrULiEDKZQbgxkMrtSgs0lYhiWjCb+BOwlAdFdC6py2cZ1EUAg0GcYoZCDdVtX1VtEauqi+xRgENIBNCG0hngYaHcXsau5skZIwRwcQwE0zaLoBe3DU3SOD6pOllTlO05u26Xw2DMDm2LOdgWDAc6mXOM0e2WnjHSw+sZAAibwQ56BjvIWYJRaoyzPvLK+ytdxq2bAOT+2t6D4VgsYGklwIQwABmIG0egpjgLREDbMIxXC3UREgPAjsWjA0vGdG8MRyC-FFkcF0v1FrklhF8IYgkggMWoBARo8g9T+0NMmYG9xaAXHzJXLaTcBFMUJlKXa058BRRYaGcYlwR4eXNooKQehOEwiGM6dqukSKExOAuB4YwXB0mmAgCEUAfSBhNkQARxlhFyFEQmKGhjhGE3Eh4SSLVHQnTOi1SOcM1II1PuTc+SsKav2yOrD+vMTxlDQQqJUv1xTxmGF1eQigp5-RwRQPBvxYqwXdFCRkLQCRcNEVAEoTJ0yQUxJYOwUUIAwGVHZRS9gmoqT-ITdUzwBS+18kIkRp0CAWxbj7LsvS8CnUjFE2hBYnCR09iVXpFS2H-jLvMAOGj-hIkZKYywuoInrOkgECEYI7C6EDKsVQ0AFGMXcSwPAqMJSHHqFOa488bzOhnkPdYuNmqV3uPqNyZxdSNH2LsNgLFnk3hNPEuWKskmJOvnTRs7977Mw7GzF+e40lIIyTlegAApGQdJnS5WxOI24LV4qriiOuWBySKWIMylrTJDBwb8MwTMnx1FDFpimoobMtJt41z3vQ68YjaCrNdL8AAcnABiBBXDjCwvMt5nwwiWNhNMKo9TQp1GIXXIIfB5kHFGbCP0bxAzBnhM0fEUZ+oxg0j0Lqbl7Q9xAmQB8QNnRyRWEcsg8wgpkWBkVFEtyVL9X7l8Yi0rB6bXWJyEChAGFwgVCJJkzrJjNBxKy4yNIhjeMxq7D21Uk1yomH3WgWA+6WgYomGSNA2VdCxZyy+QA";

    return (
        <nav>
            <ul>
                <li><Link to={`/${about}`} className="link">About</Link></li>
                <li><Link to="/" className="link">New Article</Link></li>
                {!contentEditable && <li><a onClick={toggleToolbar} className="link">Edit</a></li>}
                <li><a onClick={getLink} className="link">Get link</a></li>
            </ul>
            <Chips text={chipsText} visible={chipsVisible} />
        </nav>
    )
}