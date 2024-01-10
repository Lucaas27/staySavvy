const Footer = () => {
  return (
    <footer className="bg-custom-main py-10">
      <div className="section-container flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight text-custom-content">
          StaySavvy
        </span>
        <span className="flex gap-4 font-bold text-white">
          <small className="cursor-pointer">Privacy Policy</small>
          <small className="cursor-pointer">Terms of Service</small>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
