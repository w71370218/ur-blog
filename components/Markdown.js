
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import reactMarkDownStyle from '../styles/markdown-styles.module.css'
//import Image from 'next/image';

const Markdown = ({ children }) => {
    return (
        <ReactMarkdown className={reactMarkDownStyle.reactMarkDown} rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]}
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