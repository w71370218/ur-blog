
import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import rehypeRaw from "rehype-raw";
import gfm from 'remark-gfm';
import reactMarkDownStyle from '../styles/markdown-styles.module.css'

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
                }
            }}>
            {children}
        </ReactMarkdown >
    )
}
export default Markdown