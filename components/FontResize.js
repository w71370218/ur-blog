import { useState } from 'react';
import FontResizeStyle from '../styles/FontResize.module.css'
import contentStyle from '../styles/PostList.module.css'
import getSVG from './getSVG';

const FontResize = ({ children }) => {
    const [fontSize, setFontSize] = useState("")
    let fontControllerColor = ["", "bg-secondary text-light", ""]

    switch (fontSize) {
        case `${FontResizeStyle.big} ${contentStyle.big}`:
            fontControllerColor[0] = 'bg-secondary text-light'
            fontControllerColor[1] = ''
            fontControllerColor[2] = ''
            break;
        case "":
            fontControllerColor[1] = 'bg-secondary text-light'
            fontControllerColor[0] = ''
            fontControllerColor[2] = ''
            break;
        case `${FontResizeStyle.small} ${contentStyle.small}`:
            fontControllerColor[2] = 'bg-secondary text-light'
            fontControllerColor[0] = ''
            fontControllerColor[1] = ''
            break;
    }
    return (<>
        <div className='d-flex justify-content-end'>
            <span className={`p-1 `}>{getSVG('font type')} 字體大小　</span>
            <span className={`pointer p-1 ${fontControllerColor[0]} ${FontResizeStyle.click}`} onClick={() => setFontSize(`${FontResizeStyle.big} ${contentStyle.big}`)}>大</span>
            <span className={`pointer p-1 ${fontControllerColor[1]} ${FontResizeStyle.click}`} onClick={() => setFontSize("")}>中</span>
            <span className={`pointer p-1 ${fontControllerColor[2]} ${FontResizeStyle.click}`} onClick={() => setFontSize(`${FontResizeStyle.small} ${contentStyle.small}`)}>小</span>
        </div>
        <div className={fontSize}>
            {children}
        </div>
    </>)
}

export default FontResize