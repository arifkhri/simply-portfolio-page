import { profileStore } from "@/lib/zustand/stores/profileStore";

const Navbar = () => {
  const { profile } = profileStore()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div>
          <span className="relative flex shrink-0 overflow-hidden h-11 w-11">
            <img className="aspect-square h-full w-full grayscale" alt="Alicia Koch" src="/images/logo.png" />
          </span>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">Pekerjaan</a>
          <a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/">Perusahan</a>
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-8 rounded-full" type="button" id="radix-:rm:" aria-haspopup="menu" aria-expanded="false" data-state="closed">
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
              <img className="w-full" alt="@shadcn" src={profile?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
