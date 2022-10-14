import { Link } from 'react-router-dom';
function Nav() {
    return (

            <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link to="/" className="navbar-brand">瓊儀爸爸的部落格</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        選單
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link to="/" className="nav-link px-lg-3 py-3 py-lg-4">首頁</Link></li>
                            <li className="nav-item"><Link to="/editPage" className="nav-link px-lg-3 py-3 py-lg-4">撰寫文章</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
    );
}

export default Nav;