import {FaXTwitter, FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaWhatsapp} from 'react-icons/fa6'

export const socials={
  twitter: 'X (twitter)',
  instagram: 'Instagram',
  facebook: 'Facebook',
  youtube: 'Youtube',
  linkedin: 'LinkedIn',
  whatsapp: 'Whatsapp'
}

export const socialsOptions = Object.keys(socials).map((key) => ({
  value: key,
  label: socials[key as keyof typeof socials] ,
}));

export const socialIcons={
  twitter: <FaXTwitter className=' w-full h-full'/>,
  instagram: <FaInstagram className='w-full h-full'/>,
  facebook: <FaFacebook className='w-full h-full'/>,
  youtube: <FaYoutube className='w-full h-full'/>,
  linkedin: <FaLinkedin className='w-full h-full'/>,
  whatsapp: <FaWhatsapp className='w-full h-full'/>
}
