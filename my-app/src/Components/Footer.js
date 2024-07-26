import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row-1">
          <div className="col-1">
            <h6>About</h6>
            <p > YatraYojana ( यात्रा योजना ) is a robust hotel booking web application developed using React and Firebase, offering seamless navigation with React Router, dynamic hotel card sections.</p>
          </div>

          <div className="col-3">
            <h6>Quick Links</h6>
            <ul className="features-list">
  <li className="feature-item">Robust hotel booking web application developed using React.</li>
  <li className="feature-item">User authentication features, including login and registration.</li>
  <li className="feature-item">Seamless navigation with React Router for a smooth user experience.</li>

 
  </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row-2">
          <div className="col-4">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><FaFacebookF /></a></li>
              <li><a className="twitter" href="#"><FaLinkedinIn /></a></li>
              <li><a className="dribbble" href="#"><FaTwitter /></a></li>
              <li><a className="linkedin" href="#"><FaGithub /></a></li>
            </ul>
          </div>
          <p className="copyright-text">Copyright &copy; wali line</p>
        </div>
      </div>

    </footer>

  );
};

export default Footer;

