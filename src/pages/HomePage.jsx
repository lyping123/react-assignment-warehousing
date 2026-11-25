// HomePage
import { Link } from "react-router-dom";

function HomePage({ t }) {
  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <i className="bi bi-buildings display-1 text-primary"></i>
        <h1 className="display-5 fw-bold mt-3">{t.homeTitle}</h1>
        <p className="lead text-muted">{t.homeSubtitle}</p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-12 col-md-5">
          <div className="card h-100 shadow border-0 text-center p-4">
            <i className="bi bi-box-seam display-4 text-primary mb-3"></i>
            <h3>{t.productMgmt}</h3>
            <p className="text-muted">{t.productMgmtDesc}</p>
            <Link to="/products" className="btn btn-primary mt-auto">
              {t.goToProducts} <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>

        <div className="col-12 col-md-5">
          <div className="card h-100 shadow border-0 text-center p-4">
            <i className="bi bi-graph-up-arrow display-4 text-success mb-3"></i>
            <h3>{t.stockMgmt}</h3>
            <p className="text-muted">{t.stockMgmtDesc}</p>
            <Link to="/stock" className="btn btn-success mt-auto">
              {t.goToStock} <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
