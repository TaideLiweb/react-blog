

function Post({ title, postDate }) {
    return (
        <>
            {/* Post preview */}
            <div className="post-preview">
                <a href="post.html">
                    <h2 className="post-title">{title}</h2>
                    {/* <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3> */}
                </a>
                <p className="post-meta">
                    貼文發布日 : {postDate}
                </p>
            </div>
            {/* Divider */}
            <hr className="my-4" />
        </>
    );
}

export default Post;