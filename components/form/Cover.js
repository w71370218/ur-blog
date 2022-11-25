const Cover = () => {

    const uploadcoverImage = (files) => {
        if (files) {
            set.setCoverImage(files[0])
            if (titlename === "編輯") {
                set.setChangedImage(true)
            }
        }
    }
    const cleancoverImage = () => {
        imageInput.current.value = null
        set.setCoverImage(null)
        if (titlename === "編輯") {
            set.setChangedImage(true)
        }
    }

    return (
        <>

            <div>
                <label className='rounded-top bg-secondary text-light w-100 text-center py-2'>封面圖片</label>
                <div className="input-group mb-1 my-1">
                    {coverImage && coverImage !== null && <button className="btn border" type="button" id="inputGroupFile" onClick={e => cleancoverImage()}>X</button>}
                    <input type="file" className="form-control" id="inputGroupFile" accept="image/png, image/jpeg" ref={imageInput} onChange={e => { uploadcoverImage(e.target.files); }} />
                    <div className="mb-3 w-100 ">
                        <label className='border w-100 text-center py-1'>圖片替代文字</label>
                        <input id="floatingAlt" className={`form-control w-100 border rounded-bottom my-1`} name="alt" type="text"
                            value={alt} onChange={e => { set.setAlt(e.target.value) }} />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cover;