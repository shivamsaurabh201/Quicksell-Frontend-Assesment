import React from 'react'
import './colHeader.scss'
import plus from '../../../assets/Plus.svg'
import more from '../../../assets/More.svg'

const ColHeader = ({headerIcon, title, listCount}) => {

    const profileLetters = (name) => {
        let letters = ""
        const words = name.split(" ");
        for(let index = 0; index < words.length; index++){
            letters += words[index][0];
        }

        return letters.toUpperCase()
    }
    return (
        <div className='col-header'>
            <div className='start'>
                {headerIcon ? 
                    <img alt='' className='header icon' src={headerIcon}/>
                    :
                    <div className='initials'>
                        {profileLetters(title)}
                    </div>
                }
                <div className='title'>{title}</div>
                <div className='list-count'>{listCount}</div>
            </div>

            <div className='end'>
                <img alt='' className='plus icon' src={plus}/>
                <img alt='' className='more icon' src={more}/>
            </div>
        </div>
    )
}

export default ColHeader;