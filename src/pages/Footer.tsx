
import facebookIcon from "../assets/fb_icon.png"; // Adjust path as needed
import githubIcon from "../assets/github_icon.png"; // Adjust path as needed

const Footer = () => {
  return (
    <div className="mt-5 flex items-center space-x-3">
      <p className="text-sm">Developed by: Glenn Oliva</p>
      {/* Social Links */}
      <a href="https://www.facebook.com/profile.php?id=100093027084141" target="_blank" rel="noopener noreferrer">
        <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
      </a>
      <a href="https://github.com/GlennOliva" target="_blank" rel="noopener noreferrer">
        <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Footer;
