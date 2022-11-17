import { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import reactMarkDownStyle from '../styles/markdown-styles.module.css'
//import Image from 'next/image';

const Markdown = ({ children, top }) => {
    const [fontSize, setFontSize] = useState(reactMarkDownStyle.reactMarkDown)
    let fontControllerColor = ["", "bg-dark text-light", ""]
    let h1 = 0;
    let h2 = 0;
    let h3 = 0;
    let h4 = 0;
    let h5 = 0;
    switch (fontSize) {
        case reactMarkDownStyle.reactMarkDown_big:
            fontControllerColor[0] = 'bg-dark text-light'
            fontControllerColor[1] = ''
            fontControllerColor[2] = ''
            break;
        case reactMarkDownStyle.reactMarkDown:
            fontControllerColor[1] = 'bg-dark text-light'
            fontControllerColor[0] = ''
            fontControllerColor[2] = ''
            break;
        case reactMarkDownStyle.reactMarkDown_small:
            fontControllerColor[2] = 'bg-dark text-light'
            fontControllerColor[0] = ''
            fontControllerColor[1] = ''
            break;
    }
    return (
        <>
            <div className='d-flex justify-content-end pb-3'>
                <span className={`p-1 `}>字體大小　</span>
                <span className={`p-1 ${fontControllerColor[0]}`} onClick={() => setFontSize(reactMarkDownStyle.reactMarkDown_big)}>大</span>
                <span className={`p-1 ${fontControllerColor[1]}`} onClick={() => setFontSize(reactMarkDownStyle.reactMarkDown)}>中</span>
                <span className={`p-1 ${fontControllerColor[2]}`} onClick={() => setFontSize(reactMarkDownStyle.reactMarkDown_small)}>小</span>
            </div>
            <ReactMarkdown className={fontSize} rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={a11yDark}
                                language={match[1]}
                                PreTag="div"

                                showLineNumbers={true}
                                wrapLines={true}
                                lineProps={lineNumber => ({
                                    style: { display: 'block' }
                                })}
                                {...props}
                            >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
                        ) : (
                            <code className={`${reactMarkDownStyle.code}`} {...props}>
                                {children}
                            </code >
                        )
                    },
                    h1(props) {
                        h1++;
                        return (<h1 onClick={(e) => { window.scrollTo(0, (e.target.offsetTop - top)) }}><a href={`#${props.children}`} style={{ color: "#000" }}>{props.children}</a></h1>)
                    },
                    h2(props) {
                        h2++;
                        return (<h2 onClick={(e) => { window.scrollTo(0, (e.target.offsetTop - top)) }}><a href={`#${props.children}`} style={{ color: "#000" }}>{props.children}</a></h2>)
                    },
                    h3(props) {
                        h3++;
                        return (<h3 onClick={(e) => { window.scrollTo(0, (e.target.offsetTop - top)) }}><a href={`#${props.children}`} style={{ color: "#000" }}>{props.children}</a></h3>)
                    },
                    h4(props) {
                        h4++;
                        return (<h4 onClick={(e) => { window.scrollTo(0, (e.target.offsetTop - top)) }}><a href={`#${props.children}`} style={{ color: "#000" }}>{props.children}</a></h4>)
                    },
                    h5(props) {
                        h5++;
                        return (<h5 onClick={(e) => { window.scrollTo(0, (e.target.offsetTop - top)) }}><a href={`#${props.children}`} style={{ color: "#000" }}>{props.children}</a></h5>)
                    },
                    /*
                    p(props) {
                        if (props.children[0].type === "img") {
                            const image = props.children[0]
                            return (image)
                        }
                        else {
                            return (<p>{props.children}</p>)
                        }
                    }
                    */
                }}>
                {children}
            </ReactMarkdown >
        </>
    )
}
export default Markdown

/*
const markdownImg = ({ props }) => {
    //console.log(props)
    return (
        //< className='d-flex justify-content-center' >
        <img src={props.src} />
        //</>
    )
}
*/