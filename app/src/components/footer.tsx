import { Label } from '@/components/ui/label';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer: React.FC = () => {
  return (
    <footer className="flex w-full bg-popover text-foreground p-2 border-t-solid border-t-[1px] border-t-border items-center">
      <section className="flex-col justify-center m-[auto] items-center py-6">
        <div className="flex flex-col justify-center gap-2 mb-2">
          <Label className="text-center flex gap-2 justify-center">
            <HiOutlineMail />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mateusgutierrez9@gmail.com"
              target="_blank"
            >
              mateusgutierrez9@gmail.com
            </a>
          </Label>
          <Label className="text-center flex gap-2 justify-center pt-2">
            <FaWhatsapp />
            <a
              href="https://api.whatsapp.com/send?phone=5548988756690"
              target="blank"
            >
              (48) 98875-6690
            </a>
          </Label>
        </div>
        <div className="flex justify-center gap-4 pt-2">
          <a
            href="https://www.linkedin.com/in/mateus-gutierrez-a991aa1b9/"
            target="blank"
          >
            <FaLinkedin />
          </a>
          <a href="https://github.com/MateusGutierrez" target="blank">
            <FaGithub />
          </a>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
