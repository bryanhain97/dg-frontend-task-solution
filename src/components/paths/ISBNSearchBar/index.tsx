import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SearchItem from './SearchItem'
import { books } from '../../../assets/json/books.json'
import useDesktopSize from '../../../hooks/useDesktopSize'

export default function ISBNSearchBar() {
    const [expanded, setExpanded] = useState<boolean | null>(false)

    const desktopSize = useDesktopSize();

    useEffect(() => {
        if (desktopSize) {
            setExpanded(true)
        } else {
            setExpanded(false)
        }
    }, [desktopSize])

    const listItems = books.map(({ isbn }) => <SearchItem isbn={isbn} key={isbn} />)

    return (
        <>
            <div className="isbn-searchbar">
                <ul className={expanded ? 'list expanded' : 'list'}>
                    {listItems}
                </ul>
                {!desktopSize ?
                    <button onClick={() => setExpanded(!expanded)} className="button button-expand">
                        {expanded ? 'show less...' : 'show more...'}
                    </button> : null
                }
            </div>
            {desktopSize &&
                <Outlet />
            }
        </>
    )
}