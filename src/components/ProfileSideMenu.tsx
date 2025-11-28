import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  currentPage: string;
  onNavigate: (page: string) => void;
  navItems: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
  }>;
}

export const ProfileSideMenu: React.FC<ProfileSideMenuProps> = ({
  isOpen,
  onClose,
  isDark,
  currentPage,
  onNavigate,
  navItems,
}) => {
  // Close menu when clicking outside
  React.useEffect(() => {
    if (isOpen) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    onClose();
  };

  const menuItems = [
    ...navItems,
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      >
        <div className={cn(
          'absolute inset-0',
          isDark ? 'bg-slate-950/80 backdrop-blur-sm' : 'bg-slate-900/80 backdrop-blur-sm'
        )} />
      </div>

      {/* Side Menu */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-96 max-w-sm z-50 transform transition-transform duration-300 ease-out shadow-2xl',
          isDark ? 'bg-slate-900' : 'bg-white',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between p-6 border-b',
          isDark ? 'border-slate-800' : 'border-slate-200'
        )}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <h3 className={cn(
                'font-semibold',
                isDark ? 'text-white' : 'text-slate-900'
              )}>
                Alex Chen
              </h3>
              <p className={cn(
                'text-xs',
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              )}>
                Pro Account
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] pb-20">
          <div className="p-4 space-y-1">
            {/* Navigation Items */}
            <div className="mb-4">
              <p className={cn(
                'text-xs font-semibold uppercase tracking-wider px-3 py-2',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Navigation
              </p>
              <div className="mt-2 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      currentPage === item.id
                        ? isDark
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : isDark
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    <span className={currentPage === item.id ? 'opacity-100' : 'opacity-70'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                    {currentPage === item.id ? (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className={cn('h-px my-4', isDark ? 'bg-slate-800' : 'bg-slate-200')} />

            {/* Account Items */}
            <div>
              <p className={cn(
                'text-xs font-semibold uppercase tracking-wider px-3 py-2',
                isDark ? 'text-slate-500' : 'text-slate-500'
              )}>
                Account
              </p>
              <div className="mt-2 space-y-1">
                {menuItems.slice(navItems.length).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'logout') {
                        // Handle logout
                        console.log('Logout clicked');
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                      item.id === 'logout'
                        ? isDark
                          ? 'text-rose-400 hover:bg-rose-500/10'
                          : 'text-rose-600 hover:bg-rose-50'
                        : isDark
                          ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    )}
                  >
                    <span className="opacity-70">{item.icon}</span>
                    <span>{item.label}</span>
                    <svg className="w-4 h-4 ml-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 p-4 border-t',
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        )}>
          <div className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg',
            isDark ? 'bg-slate-800/50' : 'bg-slate-100'
          )}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className={cn(
              'text-xs',
              isDark ? 'text-slate-400' : 'text-slate-600'
            )}>
              All systems operational
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

