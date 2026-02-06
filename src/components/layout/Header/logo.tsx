import Image from "next/image";
import Link from "next/link";
import React from "react";

import logoSrc from "@/../public/logo.svg";
import { type Locale, localePath, defaultLocale } from "@/lib/i18n";

const Logo = ({ locale = defaultLocale }: { locale?: Locale }) => {
	return (
		<div className="flex items-center -ml-4">
			{/* Logo */}
			<Link href={localePath("/", locale)} className="flex items-center">
				<Image src={logoSrc} width={56} height={56} alt="logo" />
				<h6 className=" text-black text-lg uppercase font-semibold  hidden lg:block">
					Synergis Industrial Utama
				</h6>
			</Link>
		</div>
	);
};

export default Logo;
