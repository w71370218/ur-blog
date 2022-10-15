

const Post = ({ post }) => {
    return (
        <>
            <h1>{post.title}</h1>
            <div>{post.author.username}</div>
            <div>{post.updatedTime}</div>
            <div>{post.content}</div>
            <div>
                {post.tags.map(tag => (
                    <div key={tag._id}>
                        <div>{tag.name}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Post