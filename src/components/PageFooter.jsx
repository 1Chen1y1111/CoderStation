import React from "react";

function PageFooter(props) {
  return (
    <div className="footer">
      <p className="links">
        <span className="linkItem">友情链接：</span>
        <a
          href="https://1chen1y1111.github.io/"
          target="_blank"
          rel="noreferrer"
          className="linkItem"
        >
          CavsCy's Blog
        </a>
      </p>
      <p>© 2024 - Coder Station</p>
      <p>Powered by Vite.js</p>
    </div>
  );
}

export default PageFooter;
