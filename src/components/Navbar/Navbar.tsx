import AikoLogo from '../../assets/img/aiko.png';

export default function Navbar() {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={AikoLogo} alt="Aiko" width="40" height="24" className="d-inline-block align-text-top me-2" />
                    <span className="badge text-bg-primary fs-5">MachinaWatch</span>
                </a>
            </div>
        </nav>
    )
}
