import { useLayoutEffect, useRef, useState } from "react"

const Loading = () => {
    const ref = useRef()

    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        setWidth(ref.current.offsetWidth);
    }, [])

    const space = 50
    return (
        <div className="pt-5 p-3" >
            <div className="d-md-flex align-items-center justify-content-center flex-column w-100 " ref={ref}>
                <h1 className="text-center">Loading </h1>
                <p className="text-center">{`讀取中...`}</p>
                <div>
                    <svg height="100" width={width}>
                        <circle cx={width * 0.5 - space} cy="50" r="10" fill="currentColor">
                            <animate id="c1" type="translate" values="50;20;50" attributeName="cy"
                                begin="0s;c2.end" dur="0.5s" />
                            <animate id="c2" type="translate" values="50;50" attributeName="cy"
                                begin="c1.end" dur="1s" />
                        </circle>
                        <circle cx={width * 0.5} cy="50" r="10" fill="currentColor">
                            <animate id="c3" type="translate" values="50;20;50" attributeName="cy"
                                begin="0.5s;c4.end" dur="0.5s" />
                            <animate id="c4" type="translate" values="50;50" attributeName="cy"
                                begin="c3.end" dur="1s" />
                        </circle>
                        <circle cx={width * 0.5 + space} cy="50" r="10" fill="currentColor">
                            <animate id="c5" type="translate" values="50;20;50" attributeName="cy"
                                begin="1s;c6.end" dur="0.5s" />
                            <animate id="c6" type="translate" values="50;50" attributeName="cy"
                                begin="c5.end" dur="1s" />
                        </circle>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Loading