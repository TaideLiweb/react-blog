

function Post({title}) {
    return (
        <>
            {/* Post preview */}
            <div className="post-preview">
                <a href="post.html">
                    <h2 className="post-title">{title}</h2>
                    <h3 className="post-subtitle">Problems look mighty small from 150 miles up</h3>
                </a>
                <p className="post-meta">
                    Posted by
                    <a href="#!">Start Bootstrap</a>
                    on September 24, 2022
                </p>
            </div>
            {/* Divider */}
            <hr className="my-4" />
        </>
    );
}

export default Post;