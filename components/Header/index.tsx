import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import VerticalDivider from '@/components/elements/VerticalDivider';
import Link from 'next/link';
import { DeviceContext } from '@/contexts/DeviceContext';

function Header({ children }: PropsWithChildren) {
  const [mount, setMount] = useState<boolean>(false);
  const device = useContext(DeviceContext);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white">
      <div className="px-[16px] py-[15px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-[8px]">
          <Link href="/">
            {mount && device === 'mobile' ? (
              <Image
                width={81}
                height={40}
                src="/logo/logo_mobile.png"
                alt="logo"
              />
            ) : (
              <Image
                width={153}
                height={51}
                src="/logo/logo_not_mobile.png"
                alt="logo"
              />
            )}
          </Link>
          <div className="flex grow gap-[8px] font-lg-16px-bold">
            {children}
          </div>
          <Image
            width={40}
            height={40}
            src="/initial_profile.png"
            alt="profile"
          />
        </div>
      </div>
      <VerticalDivider />
    </header>
  );
}

export default Header;
