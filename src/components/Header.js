import logo from "../images/UI/Logo.svg";

export function Header() {
  return (
    <header className="header">
      <img
        className="header__logo"
        id="header-logo"
        alt="Around The U.S."
        src={logo}
      />
    </header>
  );
}
