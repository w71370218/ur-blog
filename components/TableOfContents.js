import styles from '../styles/TableOfContents.module.css'
import { useState } from 'react';
import useRWD from './useRWD';
import getSVG from './getSVG'

const TOC = ({ content, top, left }) => {
    const device = useRWD();

    const headings = ['H1', 'H2', 'H3', 'H4', 'H5']
    let toc_arr = []
    let h1_arr = []
    let h2_arr = []
    let h3_arr = []
    let h4_arr = []
    let h_arr = [[], [], [], [], []]
    let ele_arr = []
    let last = 'H1';
    if (content) {
        for (const child of content.children[0].children) {
            if (headings.includes(child.tagName)) {
                toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                    <a href={`#${child.innerText}`}>{child.innerText}</a>
                    <ol></ol>
                </span></li>))
            }
        }
    }


    /*
     content.children[0].children
    for (const child of content.children[0].children) {
        if (headings.includes(child.tagName)) {
            if (headings[child.tagName].indexOf() > headings[last].indexOf()) {
                h_arr[headings[last]].push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                    <a href={`#${child.innerText}`}>{child.innerText}</a>
                    <ol></ol>
                </span></li>))
            }
            else{
                
            }
            switch (child.tagName) {
                case 'H1':
                    toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                        <a href={`#${child.innerText}`}>{child.innerText}</a>
                        <ol></ol>
                    </span></li>))
                    break;
                case 'H2':
                    toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                        <a href={`#${child.innerText}`}>{child.innerText}</a>
                        <ol></ol>
                    </span></li>))
                    break;
                case 'H3':
                    toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                        <a href={`#${child.innerText}`}>{child.innerText}</a>
                        <ol></ol>
                    </span></li>))
                    break;
                case 'H4':
                    toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                        <a href={`#${child.innerText}`}>{child.innerText}</a>
                        <ol></ol>
                    </span></li>))
                    break;
                case 'H5':
                    toc_arr.push((<li><span onClick={() => { window.scrollTo(0, (child.offsetTop - top)) }}>
                        <a href={`#${child.innerText}`}>{child.innerText}</a>
                    </span></li>))
                    break;
            }
            last = child.tagName;
        }
    }
    */

    const [display, setDisplay] = useState("none");

    const displaytoggle = () => {
        if (display === "none") {
            setDisplay("block")
        }
        else {
            setDisplay("none")
        }
    }

    const toc_content = (<div className={`text-secondary ${styles['toc-block']}`} style={{ display: display, width: left, height: '100%' }}><ol>{toc_arr.map((content, index) => (<div key={index}>{content}</div>))}</ol></div>)

    return (
        <>
            {
                device === "PC" ?
                    (<div className={`${styles.toc}`} style={{ top: top + 10 }}>
                        <div>
                            <div className='bg-secondary text-light p-2 rounded-3 pointer' onClick={() => displaytoggle()}>
                                <span>{getSVG('menu')} 目錄</span>
                            </div>
                            {toc_content}
                        </div>
                    </div>)
                    :
                    (<div className={`${styles.toc}`} style={{ bottom: 10 }}>
                        <div>
                            {toc_content}
                            <div className='bg-secondary text-light p-2 rounded-3 pointer' onClick={() => displaytoggle()}>
                                <span>{getSVG('menu')} 目錄</span>
                            </div>
                        </div>
                    </div>)
            }
        </>
    )
}

export default TOC;