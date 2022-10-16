const Loading = () => {
    return (
        <div className="d-md-flex align-items-center justify-content-center flex-column w-100">
            <h1>Loading</h1>
            <p>{`讀取中...`}</p>
            <div>
                <svg height="100" width="300">
                    <circle cx="90" cy="50" r="10" fill="#212529">
                        <animate id="c1" type="translate" values="50;20;50" attributeName="cy"
                            begin="0s;c2.end" dur="0.5s" />
                        <animate id="c2" type="translate" values="50;50" attributeName="cy"
                            begin="c1.end" dur="1s" />
                    </circle>
                    <circle cx="150" cy="50" r="10" fill="#212529">
                        <animate id="c3" type="translate" values="50;20;50" attributeName="cy"
                            begin="0.5s;c4.end" dur="0.5s" />
                        <animate id="c4" type="translate" values="50;50" attributeName="cy"
                            begin="c3.end" dur="1s" />
                    </circle>
                    <circle cx="210" cy="50" r="10" fill="#212529">
                        <animate id="c5" type="translate" values="50;20;50" attributeName="cy"
                            begin="1s;c6.end" dur="0.5s" />
                        <animate id="c6" type="translate" values="50;50" attributeName="cy"
                            begin="c5.end" dur="1s" />
                    </circle>
                </svg>
            </div>
        </div>
    )
}

export default Loading