import Facebook from './Facebook';
import Instagram from './Instagram';
import XTwitter from './XTwitter';

export default function FooterLandingPage() {
  return (
    <footer className="h-[41px] bg-[#1c1c1c] w-full flex items-center px-8 justify-between">
      <p className="text-white text-[10px] font-medium">© 2025 Brave Tribe</p>
      <div className="flex gap-2">
        <XTwitter />
        <Instagram />
        <Facebook />
      </div>
    </footer>
  );
}
